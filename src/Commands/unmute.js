const Command = require('../Structures/Command');
const MutedRoleSchema = require('../Schemas/MutedRoleSchema');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
    name: "unmute",
    description: "Unmutes a target member",
    type: "SLASH",
    slashCommandOptions: [
        {
            name: 'target',
            description: 'The target member you want to mute',
            type: 'USER',
            required: true,
        },
    ],
    permission: 'ADMINISTRATOR',
    async run(client, message, args) {
        const member = message.options.getMember('target');

        if (member.id === message.author.id) return message.reply({
            content: '❌ You cannot unmute yourself!',
            ephemeral: true,
        });

        const role = message.guild.roles.cache.find(role => role.name === 'Muted');

        if (!role) return message.reply({
            content: '❌ Please set a Muted Role!',
            ephemeral: true,
        });
        if (!member.roles.cache.has(role)) return message.reply({
            content: '❌ This target member has not been muted!',
            ephemeral: true,
        });

        const embed = new MessageEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true, }))
            .setTitle('This user has been unmuted');

        await member.roles.remove(role.id);

        message.reply({
            content: 'User Unmuted!',
            ephemeral: true,
        });

        message.channel.send({ embeds: [embed] });
        member.send(`🎙️ You are unmuted in ${message.guild.name}! But remember to follow the server rules next time!`); 
    }
});