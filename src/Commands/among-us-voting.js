const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');

const Voting = {
    "Emergency Meeting": {
        name: 'Emergency Meeting',
        text: 'Someone called an emergency meeting.',
        color: 'BLUE',
        imageURL: 'https://static.wikia.nocookie.net/among-us-wiki/images/6/66/Emergency_meeting.png/revision/latest?cb=20210709151844',
    },
    "Dead Body Reported Meeting": {
        name: 'Dead Body Reported',
        text: 'A Dead Body has been reported.',
        color: 'RED',
        imageURL: 'https://static.wikia.nocookie.net/among-us-wiki/images/1/12/Red%27s_body_is_reported.png/revision/latest?cb=20210709172921',
    }
}

module.exports = new Command({
    name: 'among-us-voting',
    description: 'Starts a Among Us Voting Session',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'message_id',
            description: 'Copy the message ID the Among Us Game code has been sent by me and paste it here',
            type: 'STRING',
            required: true,
        },
        {
            name: 'meeting_type',
            description: 'Select the type of the Voting Session',
            type: 'STRING',
            choices: [
                {
                    name: 'Emergency Meeting',
                    value: 'Emergency Meeting',
                },
                {
                    name: 'Dead Body Reported Meeting',
                    value: 'Dead Body Reported Meeting',
                },
            ],
            required: true,
        }
    ],
    permission: 'ADMINISTRATOR',

    run: async (client, message, args) => {
        const messageID = message.options.getString('message_id');
        const meetingType = message.options.getString('meeting_type');

        const targetMessage = await message.channel.messages.fetch(messageID);
        
        if (!targetMessage) return message.reply({
            content: '❌ That message ID is invalid or does not exist!',
            ephemeral: true,
        });

        const oldEmbed = targetMessage.embeds[0];

        const embed = new MessageEmbed()
            .setTitle(`Among Us | ${Voting[meetingType].name}`)
            .setThumbnail(Voting[meetingType].imageURL)
            .setFooter(oldEmbed.footer.text, oldEmbed.footer.iconURL);
        
        if (oldEmbed.fields.length == 2 && oldEmbed.title.startsWith('Among Us') && targetMessage.editable) {
            embed.setDescription(`${Voting[meetingType].text} Who is The Impostor?`);
            embed.setColor(Voting[meetingType].color);
            embed.addField(oldEmbed.fields[0].name, oldEmbed.fields[0].value);
            embed.addField(oldEmbed.fields[1].name, oldEmbed.fields[1].value);

            let channel = message.member.voice.channel;

            for (let member of channel.members.filter((member) => !member.user.bot)) {
                await member[1].voice.setDeaf(false);
            };

            targetMessage.edit({ embeds: [embed] });
            message.reply({
                content: 'Voting Session Activated Successfully!',
                ephemeral: true,
            })
        }
    }
})