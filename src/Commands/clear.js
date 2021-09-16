const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'clear',
    type: "SLASH",
    slashCommandOptions: [
        {
            name: "amount",
            description: "The amount of message you want to delete (max: 100)",
            type: "INTEGER",
            required: true,
        }
    ],
    description: 'Clears messages',
    permission: 'MANAGE_MESSAGES',

    run: async (client, message, args) => {

        const amount = args[1] || NaN;
        if (!amount || isNaN(amount)) return message.reply({
            content: `❌ \`${(amount === undefined) ? 'Nothing' : amount}\` is not a valid number!`,
            ephemeral: true,
        });

        const amountParsed = parseInt(amount);

        if (amountParsed > 100) return message.reply({
            content: `❌ You cannot clear more than 100 messages!`,
            ephemeral: true,
        });

        const deletedMessages = message.channel.bulkDelete(amountParsed)
            .then(async messages => {
                const reminder = await message.reply({
                    content: `Cleared \`${amount}\` messages`,
                    ephemeral: true,
                }).catch(err => {
                    message.channel.send({
                        content: `Cleared \`${amount}\` messages`,
                    });
                });
                if (reminder) setTimeout(() => reminder.delete(), 3 * 1000);
            }).catch(error => {
                message.reply({
                    content: `❌ You cannot delete messages that are more than 14 days old!`,
                    ephemeral: true,
                });
            });

    }
})