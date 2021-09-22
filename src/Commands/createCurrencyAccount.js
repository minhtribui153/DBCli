const Command = require("../Structures/Command");

module.exports = new Command({
    name: "createaccount",
    description: "Creates a Currency Account",
    type: "SLASH",
    slashCommandOptions: [

    ],
    permission: 'SEND_MESSAGES',
    async run(client, message, args) {
        client.function.currency.account.create(message);

        message.reply({
            content: 'Account Created Successfully!',
            ephemeral: true,
        })
    }
});