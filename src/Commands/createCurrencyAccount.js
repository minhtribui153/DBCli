const Command = require("../Structures/Command");

module.exports = new Command({
    name: "createaccount",
    description: "Creates a Currency Account",
    type: "SLASH",
    slashCommandOptions: [

    ],
    permission: 'SEND_MESSAGES',
    async run(client, message, args) {

    }
});