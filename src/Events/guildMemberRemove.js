const Event = require("../Structures/Event");
const WelcomeSchema = require('../Schemas/WelcomeSchema');
const Discord = require("discord.js");

module.exports = new Event("guildMemberRemove", async (client, member) => {
    const server = await WelcomeSchema.findOne({ _id: member.guild.id });
    if (!server) return;

    const channelId = server.get('channelId');

    const channel = member.guild.channels.cache.findOne(c => c.id === channelId);

    const embed = new Discord.MessageEmbed();

    embed
        .setTitle("Member Left")
        .setColor("RED")
        .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setFooter(member.joinedAt.toUTCString())
        .addField("User Joined", member.joinedAt.toUTCString())
        .setTimestamp();
    
    channel.send({ embeds: [embed] });
});