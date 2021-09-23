const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'deposit',
    description: 'Deposits coins from your wallet to your bank',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'amount',
            description: 'Amount of coins you want to deposit',
            type: 'INTEGER',
            required: true,
        }
    ],
    run: async (client, message, args) => {
        const amount = message.options.getInteger('amount');

        client.function.currency.account.deposit(message, amount);
    }
})