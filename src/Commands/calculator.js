const Command = require('../Structures/Command');
const {} = require('discord.js');

module.exports = new Command({
    name: 'calculator',
    description: 'Activates Calculator',
    type: 'BOTH',
    slashCommandOptions: [],
    permission: 'SEND_MESSAGES',
    async run (client, message, args) {
        client.calculator(message, {
            embedColor: 'RED',
        })
    }
});