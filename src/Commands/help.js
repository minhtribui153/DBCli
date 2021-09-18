const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
    name: 'help',
    description: 'Shows help panel',
    type: 'BOTH',
    slashCommandOptions: [],
    permission: 'SEND_MESSAGES',
    async run (client, message, args) {
        let counter = 0;
        
        let pages = [];
        let resultsInt = 5;

        const commands = client.helpCommands;

        let pageNum = 1; 

        // const embed = new MessageEmbed()
        //     .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
        //     .setTitle('Help Panel')
        //     .setColor('RED')
        //     .setDescription(`Welcome to the ${client.user.username} help panel.`)
        //     .setFooter(`Requested by ${message.member.user.tag}`, message.member.user.avatarURL({ dynamic: true }));
        
        const times = client.helpCommands.length / resultsInt;

        
        // for (let cmd of client.helpCommands) {
        //     embed.addField(`\`${cmd["name"]}\``, `└ ${cmd["description"]}`, true);
        // }
        
        for (let i = 0; i < times; i++) {
            /**
             * @type {Command[]}
             */
            const cmds = [];

            for (let t = 0; t < resultsInt; t++) {
                try {
                    cmds.push(client.helpCommands[counter]);
                    counter += 1;
                } catch (error) {
                    cmds.push(client.helpCommands[counter]);
                    counter += 1
                };
            }

            const embed = new MessageEmbed()
                .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                .setTitle('Help Panel')
                .setColor('RANDOM')
                .setDescription(`Welcome to the ${client.user.username} help panel.`)
                .setFooter(`Requested by ${message.member.user.tag} | Page ${pageNum}`, message.member.user.avatarURL({ dynamic: true }));

            for (const command of cmds) {
                if (!command) continue;
                embed.addField(command["name"], `└ ${command["description"]}`);
            }

            pages.push(embed);
            pageNum += 1;
        }

        client.embedPages(client, message, pages, {  })
        
        // message.reply({ embeds: [embed] });
    }
});