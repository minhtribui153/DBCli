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
        const membr = message.options.getMember('target');
        const member = message.guild.members.cache.get(membr.user.id);

        if (member.id === message.member.id) return message.reply({
            content: '❌ You cannot unmute yourself!',
            ephemeral: true,
        });

        const role = message.guild.roles.cache.find(role => role.name === 'Muted');

        if (!role) return message.reply({
            content: '❌ Please set a Muted Role!',
            ephemeral: true,
        });

        const embed = new MessageEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true, }))
            .setTitle('This user has been unmuted');

        try {
            await member.roles.remove(role.id);
            
        } catch (error) {
            return message.reply({
                content: '❌ User is not muted!',
                ephemeral: true,
            })
        }

        message.reply({
            content: 'User Unmuted!',
            ephemeral: true,
        });

        message.channel.send({ embeds: [embed] });
        member.send(`🎙️ You are unmuted in ${message.guild.name}! But remember to follow the server rules next time!`); 
    }
});