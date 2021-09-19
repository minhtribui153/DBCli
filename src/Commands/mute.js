const Command = require('../Structures/Command');

module.exports = new Command({
    name: "mute",
    description: "Mutes a target member",
    type: "BOTH",
    slashCommandOptions: [
        {
            name: 'target',
            description: 'The target member you want to mute',
            type: 'USER',
            required: true,
        },
        {
            name: 'time',
            description: 'Set the time for the mute (minutes)',
            type: 'INTEGER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Tell the reason why you want to mute this user',
            type: 'STRING',
            required: true,
        }
    ],
    permission: 'ADMINISTRATOR',
    async run(client, message, args) {
        // const member = message.mentions.members.first() || message.options.getMember('target');
        // const time = args[2] || message.options.getNumber('time');
        // const reason = args.slice(3).join(' ')||  message.options.getString('reason');
        const member =  message.options.getMember('target');
        const time =  message.options.getInteger('time');
        const reason = message.options.getString('reason');
        const role = message.guild.roles.cache.find(role => role.name === 'Muted')

        if (member.user.id === message.user.id) return message.reply({
            content: '❌ You cannot mute yourself!',
            ephemeral: true,
        });
        if (member.id === client.user.id) return message.reply({
            content: '❌ You cannot make me mute myself!',
            ephemeral: true,
        });
        if (!role) return message.reply({
            content: '❌ Please set a \'Muted\' Role to mute someone!',
            ephemeral: true,
        });
        if (!member.roles.cache.some(role => role.name === 'Muted')) return message.reply({
            content: '❌ This target member has already been muted!',
            ephemeral: true,
        });
        if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply({
            content: '❌ It looks like this target user has higher roles than you. You can\'t mute them!',
            ephemeral: true,
        });

        const embed = new client.main.MessageEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true, }))
            .setTitle('This user has been muted')
            .setDescription(`This is because he/she was ${reason}`)
            .setFooter(`Muted for ${time} minute(s)`);

        await member.roles.add(role);

        message.reply({
            content: 'User Muted!',
            ephemeral: true,
        });

        message.channel.send({ embeds: [embed] });
        member.send(`🎙️ You are currently been muted in ${message.guild.name} because you were ${reason}.\nPlease do not make this happen again next time!\nYour administrators will still be able to unmute you by the way.\nYou will be unmuted in ${time} minute(s).`);

        setTimeout(() => {
            try {
                member.roles.remove(role);
                member.send(`🎙️ You are unmuted in ${message.guild.name}! But remember to follow the server rules next time!`);
            } catch (error) {
                return
            }
        }, 1000 * 60 * parseInt(time));
    }
});