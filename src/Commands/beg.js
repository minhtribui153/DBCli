const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'beg',
    description: 'Begs for money',
    type: 'BOTH',
    cooldown: 30,
    slashCommandOptions: [
    ],

    run: async (client, message, args) => {

        const randomCoins = client.function.getRandomInteger(1, 1000);

        client.function.currency.account.giveCoins(message, randomCoins)

        message.reply(`💰 You begged and received 🪙 ${randomCoins} coins!`)

    }
})