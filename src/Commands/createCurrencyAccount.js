const Command = require("../Structures/Command");

module.exports = new Command({
    name: "createaccount",
    description: "Creates a Currency Account",
    type: "SLASH",
    slashCommandOptions: [

    ],
    permission: 'SEND_MESSAGES',
    async run(client, message, args) {
        const check = client.function.currency.account.checkForAccount(message);

        if (!check) {
            client.function.currency.account.create(message);

            return message.reply({
                content: 'Account Created Successfully!',
                ephemeral: true,
            })

        } else {
            return message.reply({
                content: '❌ No Currency Account Found! Please create one!',
                ephemeral: true
            })
        }
    }
});