const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'beg',
    description: 'Begs for money',
    type: 'BOTH',
    slashCommandOptions: [
    ],

    run: async (client, message, args) => {

        const CurrencyProfileSchema = client.schemas.CurrencyProfileSchema;

        const userGot = message.member;

        const randomCoins = client.function.getRandomInteger(1, 1000);

        const response = await CurrencyProfileSchema.findOneAndUpdate({
            userID: userGot.id,

        }, {
            $inc: {
                wallet: randomCoins,
            }
        });

        message.reply(`You begged and received 🪙 ${randomCoins} coins!`)

    }
})