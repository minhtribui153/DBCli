const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');
const ReminderSchema = require('../Schemas/ReminderSchema');
const ms = require('ms');

const timeCheck = {
    s: 'seconds',
    m: 'minutes',
    h: 'hours',
    d: 'days',
}

module.exports = new Command({
    name: 'remind',
    description: 'Sets a reminder',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'duration',
            description: 'Set a duration for the reminder',
            type: 'INTEGER',
            required: true,
        },
        {
            name: 'duration_type',
            description: 'Set a duration type',
            type: 'STRING',
            choices: [
                {
                    name: 'Seconds',
                    value: 's',
                },
                {
                    name: 'Minutes',
                    value: 'm',
                },
                {
                    name: 'Hours',
                    value: 'h',
                },
                {
                    name: 'Days',
                    value: 'd',
                },
            ],
            required: true,
        },
        {
            name: 'reminder',
            description: 'Set a reminder for me to remind you',
            type: 'STRING',
            required: true,
        },
    ],
    permission: 'SEND_MESSAGES',
    async run (client, message, args) {
        const time = parseInt(message.options.getInteger('duration'));
        const type = message.options.getString('duration_type');
        const reminder = message.options.getString('reminder');
        let timeMs = 0;
        const date = new Date();

        switch (type) {
            case 's':
                timeMs = 1000 * time;
                break;
            case 'm':
                timeMs = 1000 * 60 * time;
                break;
            case 'h':
                timeMs = 1000 * 60 * 60 * time;
                break;
            case 'd':
                timeMs = 1000 * 60 * 60 * 24 * time;
                break;
        }

        const embed = new MessageEmbed()
            .setTitle(`Reminder \`${reminder}\` Created`)
            .setDescription(`I will remind you in ${time} ${timeCheck[type]}`)
            .setFooter(`Reminder created by ${message.user.tag}`, message.user.displayAvatarURL({ dynamic: true }));
        
        const remindedEmbed = new MessageEmbed()
            .setTitle(`🔔 New Upcoming Reminder 🔔`)
            .setDescription(reminder)
            .setTimestamp(date);
        
        message.reply({ embeds: [embed] });

        setTimeout(() => {
            message.user.send({ embeds: [remindedEmbed] });
        }, timeMs);
    }
});