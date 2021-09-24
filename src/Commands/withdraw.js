const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'withdraw',
    description: 'Withdraws coins from your bank to your wallet',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'amount',
            description: 'Amount of coins you want to withdraw',
            type: 'INTEGER',
            required: true,
        }
    ],
    run: async (client, message, args) => {
        const amount = message.options.getInteger('amount');

        const check = client.function.currency.account.checkForAccount(message);

        if (check) {
            client.function.currency.account.withdraw(message, amount);
        } else {
            return message.reply({
                content: '❌ No Currency Account Found! Please create one!',
                ephemeral: true
            })
        }
    }
})