const Command = require('../Structures/Command');
const {} = require('discord.js');

module.exports = new Command({
    name: 'tictactoe',
    description: 'Creates a game of Tic-Tac-Toe',
    type: 'TEXT',
    slashCommandOptions: [
        {
            name: 'user',
            description: 'Select the user to play TicTacToe with',
            type: 'USER',
            required: true,
        }
    ],
    permission: 'SEND_MESSAGES',
    async run(client, message, args) {
        client.tictactoe(message);
    }
});