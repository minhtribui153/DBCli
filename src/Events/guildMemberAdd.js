const Event = require("../Structures/Event");
const WelcomeSchema = require('../Schemas/WelcomeSchema');
const Discord = require("discord.js");

module.exports = new Event("guildMemberAdd", async (client, member) => {
    const server = await WelcomeSchema.findOne({ _id: member.guild.id });
    if (!server) return;

    const channelId = server.get('channelId');

    const channel = member.guild.channels.cache.findOne(c => c.id === channelId);

    const embed = new Discord.MessageEmbed();

    embed
        .setTitle("New Member")
        .setColor("GREEN")
        .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setFooter(member.joinedAt.toUTCString())
        .addFields(
            {
                name: "Account Creation",
                value: member.user.createdAt.toUTCString(),
                inline: true,
            },
            {
                name: "Joined At",
                value: member.joinedAt.toUTCString(),
                inline: true,
            },
        )
        .setTimestamp(member.joinedTimestamp);
    
    channel.send({ embeds: [embed] });
})