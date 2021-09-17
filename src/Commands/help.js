const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
    name: 'help',
    description: 'Shows help panel',
    type: 'BOTH',
    slashCommandOptions: [],
    permission: 'SEND_MESSAGES',
    async run (client, message, args) {
        const embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
            .setTitle('Help Panel')
            .setColor('RED')
            .setDescription(`Welcome to the ${client.user.username} help panel.`)
            .setFooter(`Requested by ${message.member.user.tag}`, message.member.user.avatarURL({ dynamic: true }));
        
        for (let cmd of client.helpCommands) {
            embed.addField(`\`${cmd["name"]}\``, `└ ${cmd["description"]}`, true);
        }

        message.reply({ embeds: [embed] });
    }
});