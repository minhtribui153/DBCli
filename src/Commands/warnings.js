const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'warnings',
    type: "SLASH",
    slashCommandOptions: [
        {
            name: 'target',
            description: 'Select the target member to check for warnings',
            type: "USER",
            required: false,
        }
    ],
    description: 'Shows warnings of a user',

    run: async (client, message, args) => {
        const WarnSchema = client.schemas.WarnSchema;

        const user = message.options.getMember('target') || message.author;

        WarnSchema.findOne({
            guild: message.guild.id,
            user: user.id,
        }, async (err, data) => {
            if (data) {
                const e = data.content.map(
                    (w, i) => `\n\`${i + 1}\` - Moderator: ${message.guild.members.cache.get(w.moderator).user.tag}, Reason: ${w.reason}`
                );
                const embed = new client.main.MessageEmbed()
                    .setTitle(`${user.user.tag} warnings`)
                    .setDescription(e.join(' '));

                message.reply({ embeds: [embed] });
            } else {
                message.reply({
                    content: `${user.user.tag} does not have any warnings!`,
                    ephemeral: true,
                });
            }
        })
    }
})