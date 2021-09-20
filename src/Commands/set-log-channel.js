const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'set-logging-channel',
    description: 'Sets a logging channel',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'channel',
            description: 'Select a channel for Server Logging',
            type: 'CHANNEL',
            required: true,
        }
    ],
    permission: 'ADMINISTRATOR',

    run: async (client, message, args) => {
        const LogChannelSchema = client.schemas.LogChannelSchema;

        const channel = message.options.getChannel('channel');

        await LogChannelSchema.findOneAndUpdate(
            {
                _id: message.guild.id
            },
            {
                _id: message.guild.id,
                channelId: channel.id,
            },
            {
                upsert: true,
            }
        );

        message.reply({
            content: 'Logging Channel Set!',
            ephemeral: true,
        });
    }
})