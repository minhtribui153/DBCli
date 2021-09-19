const Command = require('../Structures/Command');

const winning = {
    Crewmates: {
        name: 'Crewmates Win',
        text: "It looks like the Impostors has failed to sabotage and kill everyone! Congratulations crewmates for winning the game!",
        color: "GREEN",
        imageURL: "https://i.ytimg.com/vi/LQ_2IrYD9gI/maxresdefault.jpg",
    },
    Impostors: {
        name: "Impostors Win",
        text: "Congratulations Impostors for winning the game! Better luck next time Crewmates!",
        color: "RED",
        imageURL: "https://i.ytimg.com/vi/TqZncBv902Y/maxresdefault.jpg",
    }
}

module.exports = new Command({
    name: 'among-us-end',
    description: 'Ends an Among Us Game',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'message_id',
            description: 'Copy the message ID the Among Us Game code has been sent by me and paste it here',
            type: 'STRING',
            required: true,
        },
        {
            name: 'winner',
            description: 'Who won the Among Us Match? Impostor or Crewmate?',
            type: "STRING",
            choices: [
                {
                    name: "Crewmates won",
                    value: "Crewmates"
                },
                {
                    name: "Impostors won",
                    value: "Impostors"
                }
            ],
            required: true,
        }
    ],
    permission: 'ADMINISTRATOR',

    run: async (client, message, args) => {
        const messageID = message.options.getString('message_id');
        const winner = message.options.getString('winner');

        const targetMessage = await message.channel.messages.fetch(messageID);
        
        if (!targetMessage) return message.reply({
            content: '❌ That message ID is invalid or does not exist!',
            ephemeral: true,
        });

        const oldEmbed = targetMessage.embeds[0];

        const embed = new client.main.MessageEmbed()
            .setTitle(`Among Us | ${winning[winner].name}`)
            .setDescription(`${winning[winner].text} Thanks for playing!`)
            .setColor(winning[winner].color)
            .setThumbnail(winning[winner].imageURL)
            .setFooter(oldEmbed.footer.text, oldEmbed.footer.iconURL);
        
        if (oldEmbed.fields.length == 2 && oldEmbed.title.startsWith('Among Us')) {
            embed.addField(oldEmbed.fields[0].name, oldEmbed.fields[0].value);
            embed.addField(oldEmbed.fields[1].name, oldEmbed.fields[1].value);

            let channel = message.member.voice.channel;

            for (let member of channel.members.filter((member) => !member.user.bot)) {
                await member[1].voice.setDeaf(false);
                await member[1].voice.setMute(false);
            };

            targetMessage.edit({ embeds: [embed] });
            message.reply({
                content: 'Game Ended Successfully!',
                ephemeral: true,
            })
        };
    }
})