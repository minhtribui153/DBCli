const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'help',
    description: 'Shows help panel',
    type: 'BOTH',
    slashCommandOptions: [],
    permission: 'SEND_MESSAGES',
    async run (client, message, args) {
        let counter = 0;
        
        let pages = [];
        let resultsInt = 3;

        let pageNum = 1; 
        
        const times = client.helpCommands.length / resultsInt;
        
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

            const embed = new client.main.MessageEmbed()
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

        message.reply({
            content: 'Help Command loaded!',
            ephemeral: true,
        })

        client.function.embedPages(client, message, pages, {  })
        
    }
});