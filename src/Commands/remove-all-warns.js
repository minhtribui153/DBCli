const Command = require('../Structures/Command');
const WarnSchema = require('../Schemas/WarnSchema');

module.exports = new Command({
    name: 'remove-all-warns',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'target',
            description: 'Select the target member to remove all warnings',
            type: 'USER',
            required: true,
        },
    ],
    description: 'Remove all warnings of a user',
    permission: 'ADMINISTRATOR',
    
    run: async (client, message, args) => {
        const user =  message.options.getMember('target');
        if (!user) return message.channel.send({
            content: '❌ User Not Found',
            ephemeral: true,
        });
        WarnSchema.findOne({
            guild: message.guild.id,
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                await WarnSchema.findOneAndDelete({
                    user: user.user.id,
                    guild: message.guild.id
                })
                message.reply(`Cleared all the warnings!`)
            } else {
                message.reply({ 
                    content: '❌ User does not have any warnings in this server!',
                    ephemeral: true,
                });
            }
        })
    }
})