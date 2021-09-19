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

const config = require("../Data/config.json");

// Error Structures
const { SetupError, CommandError, EventError } = require('./Error');

// Client Structure
class Client extends Discord.Client {
    constructor() {
        super({ intents: new Discord.Intents(config.intents) });
		
		// Discord Configuration Variables
		this.helpCommands = [];
        this.commands = new Discord.Collection();

		// Bot Setup
		this.commandFolder = '';
		this.sourcesFolder = '';
		this.eventsFolder = '';
		this.token = '';
		this.intents = undefined;

		// MongoDB Setup

		/**
		 * @type {{ username: String, password: String, host: String, port: Number | String, database: String }}
		 */
		this.mongoDB = {};

		// Configuration Variables
		this.config = { ownerID: undefined, prefix: undefined, password: undefined };
		
		
		// Functions
		this.main = Discord;
		this.function = functions;
		
		// Others
		this.mongoCurrency = mongoCurrency
		
    }

	/**
	 * Starts the bot
	 * @param {String} token
	 */
    async start() {

		if (this.sourcesFolder === '') throw new SetupError('Please setup a Sources Folder!');
		if (this.commandFolder === '') throw new SetupError('Please setup a Command Folder!');
		if (this.eventsFolder === '') throw new SetupError('Please setup a Events Folder!');
		if (this.token === '') throw new SetupError('Please provide a bot token!');

		let counter = 1;

        // Command Handler
		const commandsLoad = {};
		
		// Only Syncing Commands
		const commandFiles = fs.readdirSync(`./${this.sourcesFolder}/${this.commandFolder}`)
			.filter(file => file.endsWith(".js"));

		/**
		 * @type {Command[]}
		 */
		const commands = commandFiles.map(file => require(`../Commands/${file}`));

		commands.forEach(cmd => {
			if (!cmd.name || !cmd.description || !cmd.type) throw new CommandError('Command Name/Description/Type not set!');
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

		fs.readdirSync(`./${this.sourcesFolder}/${this.eventsFolder}`)
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Event}
				 */
				const event = require(`../Events/${file}`);
				if (!event.event) throw new EventError('Event name not set!');
				eventsLoad[counter] = { Event: event.event };
				this.on(event.event, event.run.bind(null, this));
				counter += 1;
			});
		
		if (!this.mongoDB === {}) {
			await Mongo(this.mongoDB).then(console.log('[STATUS] Connecting to Database'));
			await Mongo.MongoCurrency(this.mongoDB).then('[STATUS] Connected to Discord Currency');
		} else {
			console.warn('[WARNING] MongoDB not setup! Bot will not connect to Database!');
		}

		console.table(commandsLoad);
		console.table(eventsLoad);

        
        this.login(this.token);
	}

	/**
	 * @typedef {{ username: String, password: String, host: String, port: Number | String, database: String }} mongoDbConfig
	 * @param {{ commandFolder: String, sourcesFolder: String, eventsFolder: String, token: String, intents: Number | Object, mongoDB: mongoDbConfig  }} config 
	 */
	setup(config) {
		// Bot Configuration
		this.commandFolder = config.commandFolder;
		this.sourcesFolder = config.sourcesFolder;
		this.eventsFolder = config.eventsFolder;
		this.token = config.token;
		this.intents = config.intents;

		// MongoDB Configuration
		this.mongoDB = config.mongoDB;
	}
}

module.exports = Client;