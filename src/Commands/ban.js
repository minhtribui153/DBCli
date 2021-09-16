const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'ban',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'target',
            description: 'Select the target member you want to ban',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Type in the reason why you want to ban this user',
            type: 'STRING',
            required: true,
        },
    ],
    description: 'Bans the target member',
    permission: 'ADMINISTRATOR',

    run: async (client, message, args) => {
        const user = message.options.getMember('target');
        if (!user) return message.reply({
            content: '❌ Mention a user to ban!',
            ephemeral: true,
        });
        const reason = args.slice(2).join(' ');
        if (!reason) return message.reply({
            content: '❌ Type in the reason why you want to ban this user!',
            ephemeral: true,
        });

        if (user) {
            const member = message.guild.member(user);

            try {
                if (member) {
                    await member.ban({
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
                    content: '❌ I don\'t have enough permission to ban this member!',
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