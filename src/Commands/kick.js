const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'kick',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'target',
            description: 'Select the target member you want to kick',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Type in the reason why you want to kick this user',
            type: 'STRING',
            required: true,
        },
    ],
    description: 'Kicks the target member',
    permission: 'ADMINISTRATOR',

    run: async (client, message, args) => {
        const user = message.options.getMember('target');
        if (!user) return message.reply({
            content: '❌ Mention a user to kick!',
            ephemeral: true,
        });
        const reason = args.slice(2).join(' ');
        if (!reason) return message.reply({
            content: '❌ Type in the reason why you want to kick this user!',
            ephemeral: true,
        });

        if (user) {
            const member = message.guild.members.cache.get(user.id);

            try {
                if (member) {
                    await member.kick({
                        reason: reason,
                    });
                } else {
                    return message.reply({
                        content: '❌ User Not Found in this server!',
                        ephemeral: true,
                    });
                } 
            } catch (error) {
                return message.reply({
                    content: '❌ I don\'t have enough permission to kick this member!',
                    ephemeral: true,
                });
            }
        } else {
            return message.reply({
                content: '❌ User Not Found in this server!',
                ephemeral: true,
            });
        }
    }
})