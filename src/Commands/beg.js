const Command = require('../Structures/Command');
const {} = require('discord.js');

module.exports = new Command({
    name: 'beg',
    description: 'Begs for money',
    type: 'SLASH',
    slashCommandOptions: [],
    permission: 'SEND_MESSAGES',
    async run (client, message, args) {
        const coins = client.function.getRandomInteger(1, 1000);
        const user = await client.mongoCurrency.findUser(message.member.id, message.guild.id); // Get the user from the database
        if (!user) {
            client.mongoCurrency.createUser(message.user.id, message.guild.id);
        }
        client.mongoCurrency.giveCoins(message.user.id, message.guild.id, coins);
        message.reply(`You have been given 🪙${coins} coins!`);
    }
});