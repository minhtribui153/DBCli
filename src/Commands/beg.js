const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'beg',
    description: 'Begs for money',
    type: 'BOTH',
    cooldown: 30,
    slashCommandOptions: [
    ],

    run: async (client, message, args) => {

        const checks = client.function.currency.account.checkForAccount(message);

        const randomCoins = client.function.getRandomInteger(1, 1000);

        const use = [
            "Yes",
            "No",
        ];

        const check = client.function.choose(use);

        if (check === "Yes" && checks) {
            client.function.currency.account.giveCoins(message, randomCoins);
            return message.reply(`💰 You begged and received 🪙 ${randomCoins} coins!`);
        } else if (check === "No" && checks) {
            return message.reply(`❌ You begged and received Nothing, LOL! 😆`);
        } else {
            return message.reply({
                content: '❌ No Currency Account Found! Please create one!',
                ephemeral: true
            });
        }

    }
})