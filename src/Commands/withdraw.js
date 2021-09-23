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

        client.function.currency.account.withdraw(message, amount);
    }
})