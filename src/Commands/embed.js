const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'embed',
    description: 'test embed',
    type: 'TEXT',
    slashCommandOptions: [],
    permission: 'SEND_MESSAGES',
    async run (client, message, args) {
        const embed = new client.main.MessageEmbed()
            .setTitle('Hello')
        
        const newMessage = await message.reply({ embeds: [embed] });
        const embeds = newMessage.embeds[0];
        embeds.setTitle('World');
        newMessage.edit({ embeds: [embeds] });
    }
});