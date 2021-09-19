const Command = require('../Structures/Command');
const {} = require('discord.js');

module.exports = new Command({
    name: 'rps',
    description: 'A Rock Paper Scissors Game',
    type: 'TEXT',
    slashCommandOptions: [],
    permission: 'SEND_MESSAGES',
    async run (client, message, args) {
        client.function.rps(message);
    }
});