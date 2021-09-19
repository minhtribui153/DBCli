// Discord Packages
const Discord = require("discord.js");

// Structures
const Command = require("./Command");
const Event = require("./Event");
const Mongo = require('./Mongo');

// Functions
const functions = require('../function');

// Others
const mongoCurrency = require('discord-mongo-currency');
const fs = require("fs");

// Configuration
const config = require('../Data/config.json');
const intents = new Discord.Intents(config.intents);

// Client Structure
class Client extends Discord.Client {
    constructor() {
        super({ intents });

		
		// Discord Configuration Variables
        // /**
        //  * @type {Command[]}
        //  */
		this.helpCommands = [];
		// /**
        //  * @type {Command[]}
        //  */
        this.commands = new Discord.Collection();

		// Configuration Variables
		this.config = { ownerID: config.ownerID, prefix: config.prefix, password: config.password };
		
		
		// Functions
		this.main = Discord;
		this.function = functions;

		// Others
		this.mongoCurrency = mongoCurrency;
    }

	/**
	 * Starts the bot
	 */
    async start(token) {

		let counter = 1;

        // Command Handler
		const commandsLoad = {};
		
		// Only Syncing Commands
		const commandFiles = fs.readdirSync("./src/Commands")
			.filter(file => file.endsWith(".js"));

		/**
		 * @type {Command[]}
		 */
		const commands = commandFiles.map(file => require(`../Commands/${file}`));

		commands.forEach(cmd => {
			commandsLoad[counter] = { Command: cmd.name, Description: cmd.description, Type: cmd.type }
			this.commands.set(cmd.name, cmd);
			this.helpCommands.push(cmd);
			counter += 1;
		});

		const slashCommands = commands
			.filter(cmd => ["BOTH", "SLASH"].includes(cmd.type))
			.map(cmd => ({
				name: cmd.name.toLowerCase(),
				description: cmd.description,
				permissions: [],
				options: cmd.slashCommandOptions,
				defaultPermission: true
			}));

		// Event Handler

		this.removeAllListeners();

		this.on("ready", async () => {
            const cmds = await this.application.commands.set(slashCommands);
			console.log('[STATUS] Slash Commands Registered')
		});

		const eventsLoad = {};
		counter = 1

		fs.readdirSync("./src/Events")
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Event}
				 */
				const event = require(`../Events/${file}`);
				eventsLoad[counter] = { Event: event.event };
				this.on(event.event, event.run.bind(null, this));
				counter += 1;
			});

        await Mongo().then(console.log('[STATUS] Connecting to Database'));
		await Mongo.MongoCurrency().then('[STATUS] Connected to Discord Currency');

		console.table(commandsLoad);
		console.table(eventsLoad);

        
        this.login(token);
	}

	/**
	 * 
	 * @param {{}} functionArray 
	 */
	addFunctions(functionArray) {
		this.function = functionArray;
		console.log('[INFO] Functions Added');
	}
}

module.exports = Client;