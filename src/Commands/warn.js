const Command = require('../Structures/Command');
const WarnSchema = require('../Schemas/WarnSchema');

module.exports = new Command({
    name: 'warn',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'target',
            description: 'Select the target member to warn that member',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Enter a reason why you want to warn this user',
            type: 'STRING',
            required: false,
        }
    ],
    description: 'Warns a member',
    permission: 'ADMINISTRATOR',
    
    run: async (client, message, args) => {
        const user = message.options.getMember('target');

        if (!user) return message.reply({
            content: '❌ Invalid User ID/Mention!',
            ephemeral: true,
        });
        const reason = args.slice(2).join(" ");

        WarnSchema.findOne({
            guild: message.guild.id,
            user: user.user.id,
        }, async (err, data) => {
            if (!data) {
                data = new WarnSchema({
                    guild: message.guild.id,
                    user: user.user.id,
                    content: [{
                        moderator:  message.user.id || message.author.id,
                        reason: reason,
                    }]
                })
            } else {
                const object = {
                    moderator:  message.user.id || message.author.id,
                    reason: reason,
                }
                data.content.push(object);
            }
            data.save();
        });

        message.reply(`User Warned!`);
        user.send(`You have been warned by ${message.user.tag}!`);
    }
})