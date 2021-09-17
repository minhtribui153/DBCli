// Discord Packages
const Discord = require("discord.js");
const Distube = require("distube");
const logs = require('discord-logs');

// Structures
const Command = require("./Command");
const Event = require("./Event");
const Mongo = require('./Mongo');

// Functions
const getRandomInteger = require('../Functions/getRandomInteger');
const tictactoe = require('../Functions/tictactoe');
const calc = require('../Functions/calculator');
const rps = require('../Functions/rps');

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

        /**
         * @type {Discord.Collection<string, Command>}
         */

		// Discord Configuration Variables
		this.helpCommands = new Discord.Collection();
        this.commands = new Discord.Collection();

		// Configuration Variables
		this.ownerID = config.ownerID;
        this.prefix = config.prefix;
		this.password = config.password;
		
		// Music Variables
		this.distube = new Distube(this, { searchSongs: false, emitNewSongOnly: true });
		this.status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
		
		// Functions
		this.getRandomInteger = getRandomInteger;
		this.tictactoe = tictactoe;
		this.calculator = calc;
		this.rps = rps;

		// Others
		this.mongoCurrency = mongoCurrency;
    }

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
			this.helpCommands.set(cmd.name, cmd);
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
}

module.exports = Client;