const Command = require('../Structures/Command');
const {} = require('discord.js');

module.exports = new Command({
    name: 'calculator',
    description: 'Activates Calculator',
    type: 'TEXT',
    slashCommandOptions: [],
    permission: 'SEND_MESSAGES',
    async run (client, message, args) {
        client.function.calc(message, {
            embedColor: 'RED',
        })
    }
});