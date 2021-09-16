const Command = require('../Structures/Command');
const WarnSchema = require('../Schemas/WarnSchema');

module.exports = new Command({
    name: 'remove-warns',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'target',
            description: 'Select the target member to remove warning',
            type: 'USER',
            required: true,
        },
        {
            name: 'number',
            description: 'Enter a warning number to remove that user\'s warning',
            type: 'INTEGER',
            required: true,
        }
    ],
    description: 'Remove warnings of a user',
    permission: 'ADMINISTRATOR',
    
    run: async (client, message, args) => {
        const user = message.guild.members.cache.get(args[1]);
        if (!user) return message.channel.send({
            content: '❌ User Not Found',
            ephemeral: true,
        });
        WarnSchema.findOne({
            guild: message.guild.id,
            user: user.user.id,
        }, async (err, data) => {
            if (data) {
                let number = parseInt(args[1]) - 1
                if (isNaN(number)) return message.channel.send({
                    content: "❌ Warning number is not a number!",
                    ephemeral: true,
                });
                data.content.splice(number, 1);
                message.reply('Warning Deleted Successfully!')
                data.save();
            } else {
                message.reply({ 
                    content: '❌ User does not have any warnings in this server!',
                    ephemeral: true,
                });
            }
        });
    }
})