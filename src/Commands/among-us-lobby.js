const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'among-us-lobby',
    description: 'Sends players (including you) back to the Among Us Match Lobby!',
    permission: 'ADMINISTRATOR',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'message_id',
            description: 'Copy the message ID the Among Us Game code has been sent by me and paste it here',
            type: 'STRING',
            required: true,
        },
    ],

    run: async (client, message, args) => {
        const messageID = message.options.getString('message_id');

        const targetMessage = await message.channel.messages.fetch(messageID);
        
        if (!targetMessage) return message.reply({
            content: '❌ That message ID is invalid or does not exist!',
            ephemeral: true,
        });

        const oldEmbed = targetMessage.embeds[0];

        const embed = new MessageEmbed()
            .setTitle('Among Us | Lobby')
            .setDescription('A new Among Us Match has been created!')
            .setColor('GREY')
            .setThumbnail('https://i.imgflip.com/4k2ieq.png')
            .setFooter(oldEmbed.footer.text, oldEmbed.footer.iconURL);
        
        if (oldEmbed.fields.length == 2 && oldEmbed.title.startsWith('Among Us')) {
            embed.addField(oldEmbed.fields[0].name, oldEmbed.fields[0].value);
            embed.addField(oldEmbed.fields[1].name, oldEmbed.fields[1].value);

            targetMessage.edit({ embeds: [embed] });
            message.reply({
                content: 'Game Lobby Activated Successfully!',
                ephemeral: true,
            })
        };
    }
})
