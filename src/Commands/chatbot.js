const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'set-chatbot',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'channel',
            description: 'Enter a channel for chatbot to work',
            type: 'CHANNEL',
            required: true,
        }
    ],
    description: 'Set a channel for chatbot',
    permission: 'ADMINISTRATOR',

    run: async (client, message, args) => {
        const ChatbotSchema = client.schemas.ChatbotSchema;

        const channel = message.options.getChannel('channel');
        if (!channel) return message.reply('❌ Enter a channel ID for chatbot!');

        ChatbotSchema.findOne(
            {
                guild: message.guild.id,
            },
            async (err, data) => {
                if (data) data.delete();
                new ChatbotSchema(
                    {
                        _id: message.guild.id,
                        guild: message.guild.id,
                        channel: channel.id,
                    }
                ).save();
                message.channel.send(`Channel for Chatbot set to <#${channel.id}>`);
            }
        )
    }
})