const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'among-us-start',
    description: 'Starts the Among Us Game',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'message_id',
            description: 'Copy the message ID the Among Us Game code has been sent by me and paste it here',
            type: 'STRING',
            required: true,
        }
    ],
    permission: 'ADMINISTRATOR',

    run: async (client, message, args) => {
        const messageID = message.options.getString('message_id');

        const targetMessage = await message.channel.messages.fetch(messageID);
        
        if (!targetMessage) return message.reply({
            content: '❌ That message ID is invalid or does not exist!',
            ephemeral: true,
        });

        const oldEmbed = targetMessage.embeds[0];

        const embed = new client.main.MessageEmbed()
            .setTitle('Among Us | Tasks')
            .setDescription('The Among Us Match has been started! Start doing your tasks!')
            .setColor('GREEN')
            .setThumbnail('https://i.imgflip.com/4k2ieq.png')
            .setFooter(oldEmbed.footer.text, oldEmbed.footer.iconURL);
        
        if (oldEmbed.fields.length == 2 && oldEmbed.title.startsWith('Among Us')) {
            embed.addField(oldEmbed.fields[0].name, oldEmbed.fields[0].value);
            embed.addField(oldEmbed.fields[1].name, oldEmbed.fields[1].value);

            let channel = message.member.voice.channel;

            for (let member of channel.members.filter((member) => !member.user.bot)) {
                await member[1].voice.setDeaf(true);
            };

            targetMessage.edit({ embeds: [embed] });
            message.reply({
                content: 'Game Started Successfully!',
                ephemeral: true,
            })
        };
    }
})