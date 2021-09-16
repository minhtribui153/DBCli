const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
    name: 'evaluate',
    description: 'Evaluates an expression using JavaScript (Owner-Only)',
    slashCommandOptions: [
        {
            name: 'password',
            description: 'Enter Password to use this command',
            type: 'STRING',
            required: true,
        },
        {
            name: 'expression_code',
            description: 'Type in the evaluation code',
            type: 'STRING',
            required: true,
        },
    ],
    type: 'SLASH',

    run: async (client, message, args) => {
        const password = message.options.getString('password');
        const expressionCode = message.options.getString('expression_code');

        if (!password === client.password) return message.reply({
            content: '❌ Incorrect Password! Access Denied!',
            ephemeral: true,
        });

        if (!message.user.id === client.ownerID) return message.reply({
            content: `❌ Not my owner! Access Denied!`,
            ephemeral: true,
        });

        const embed = new MessageEmbed()
            .setAuthor(`${client.user.tag} Evaluation`, client.user.displayAvatarURL({ dynamic: true }))
            .setTitle('JavaScript Evaluation')
            .setDescription('This is used to evaluate JavaScript code from my console. (Owner-Only)')
            .addField('EXPRESSION CODE', `\`\`\`js\n${expressionCode}\n\`\`\``);
        
        try {
            const evaluation = await eval(expressionCode);
            embed.setColor('BLUE');
            embed.addField('STATUS', `✅   OK  | \`${evaluation}\``);
            return message.reply({
                embeds: [embed],
                ephemeral: true,
            });
        } catch (err) {
            embed.setColor('RED');
            embed.addField('STATUS', `❌ ERROR | \`${err}\``);
            return message.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }
    }
})