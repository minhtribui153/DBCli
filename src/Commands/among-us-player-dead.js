const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'among-us-player-dead',
    description: 'Marks the player as dead and mutes them from Discord Call',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'player',
            description: 'Select a player inside Discord to mark as dead',
            type: 'USER',
            required: true,
        }
    ],
    permission: 'ADMINISTRATOR',
    
    run: async (client, message, args) => {
        const target = message.options.getMember('player');

        if (!target) return message.reply({
            content: '❌ User Not Found',
            ephemeral: true,
        });

        await target.voice.setMute(true);
        message.reply({
            content: 'Marked player as dead!',
            ephemeral: true,
        });
    }
})