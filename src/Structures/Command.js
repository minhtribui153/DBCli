/** @format */

// Discord Packages
const Discord = require("discord.js");

// Structures
const Client = require("./Client.js");

/**
 * Runs the bot
 * @param {Discord.Message | Discord.CommandInteraction} message
 * @param {string[]} args
 * @param {Client} client
 */
function RunFunction(client, message, args) { }

// Command Structure
class Command {
	/**
	 * @typedef {"BOTH" | "SLASH" | "TEXT"} CommandType
	 * @typedef {{name: string, description: string, permission: Discord.PermissionString, type: CommandType, cooldown: Number, slashCommandOptions: Discord.ApplicationCommandOption[], run: RunFunction}} CommandOptions
	 * @param {CommandOptions} options
	 */
	constructor(options) {
		this.name = options.name;
		this.description = options.description;
		this.permission = options.permission ? options.permission : "SEND_MESSAGES";
		this.type = ["BOTH", "SLASH", "TEXT"].includes(options.type) ? options.type : "TEXT";
		this.slashCommandOptions = options.slashCommandOptions || [];
		this.cooldown = options.cooldown ? options.cooldown : 0;
		this.run = options.run;
	}
}

module.exports = Command;