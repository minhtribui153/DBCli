const Command = require("../Structures/Command");
const { sudo } = require('discord.sudo');

module.exports = new Command({
    name: "sudo",
    description: "Pretends to be another member",
    type: "SLASH",
    slashCommandOptions: [
        {
            name: 'member',
            description: 'Mention the member to pretend',
            type: 'USER',
            required: true,
        },
        {
            name: 'message',
            description: 'The message to pretend to be another member',
            type: 'STRING',
            required: true,
        }
    ],
    permission: 'ADMINISTRATOR',
    async run(client, message, args) {
        const member = message.options.getMember('member');
        const msg = message.options.getString('message');
        const sudoMessage = new sudo({
            setMessage: message,
            setText: msg,
            setMember: member
        });
        sudoMessage.start();
        message.reply({
            content: `Pretended to be ${member.user.tag}`,
            ephemeral: true,
        });
    }
});