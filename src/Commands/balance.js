const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'balance',
    description: 'Checks your currency balance',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'user',
            description: 'Select a user to check their balance',
            type: "USER",
            required: true,
        }
    ],

    run: async (client, message, args) => {

        const CurrencyProfileSchema = client.schemas.CurrencyProfileSchema;

        const userGot = message.options.getMember('user') || message.member;

        const user = CurrencyProfileSchema.findOne({ userID: userGot.id }, async (err, results) => {
            if (results) {
                let wallet = results.wallet;
                let bank = results.bank;

                const embed = new client.main.MessageEmbed()
                    .setColor('BLUE')
                    .setTitle('🪙 User Balance 🪙')
                    .addField('👛 Wallet', `${wallet}`)
                    .addField('🏦 Bank', `${bank}`);

                message.reply({ embeds: [embed] });
            } else return message.reply({
                content: '❌ User has not started their currency account!',
                ephemeral: true,
            });

        });
    }
})