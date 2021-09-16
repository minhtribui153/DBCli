const Command = require("../Structures/Command");

module.exports = new Command({
    name: "ping",
    description: "Probably the best command ever created",
    type: "SLASH",
    slashCommandOptions: [],
    permission: 'ADMINISTRATOR',
    async run(client, message, args) {
        message.reply(`Pong: \`${client.ws.ping}\` ms.`);
    }
});