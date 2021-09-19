const AmongUsCategorySchema = require('../Schemas/AmongUsCategorySchema');
const Command = require('../Structures/Command');

const channelNameStart = 'Among Us';

module.exports = new Command({
    name: 'among-us-new',
    description: 'Creates a new Among Us Game',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'region',
            description: 'Set a region for the Among Us Game',
            type: 'STRING',
            choices: [
                {
                    name: 'North America',
                    value: 'North America'
                },
                {
                    name: 'Europe',
                    value: 'Europe',
                },
                {
                    name: 'Asia',
                    value: 'Asia',
                },
            ],
            required: true,
        },
        {
            name: 'code',
            description: 'The code for the Among Us Game',
            type: 'STRING',
            required: true,
        },
    ],
    permission: 'ADMINISTRATOR',

    run: async (client, message, args) => {
        const region = message.options.getString('region');
        const code = message.options.getString('code');

        const { channel, guild, member } = message;

        const categoryDocument = await AmongUsCategorySchema.findOne({
            _id: guild.id,
        });

        if (!categoryDocument) {
            message.reply({
                content: '❌ No Among Us Category has been set in this server!',
                ephemeral: true,
            });
            return;
        }

        const AmongUsChannelName = `${channelNameStart} "${code}"`
        await guild.channels.create(AmongUsChannelName, {
            type: 'GUILD_VOICE',
            userLimit: 15,
            parent: categoryDocument.categoryId,
        });

        const embed = new client.main.MessageEmbed()
            .setTitle('Among Us | Lobby')
            .setDescription('A new Among Us Match has been created!')
            .addField('🌎 Region', region)
            .addField('#️⃣ Code', code)
            .setThumbnail('https://d1lss44hh2trtw.cloudfront.net/assets/article/2020/10/22/best-lobby-settings-among-us_feature.jpg')
            .setColor('GREY')
            .setFooter(`Hosted by ${message.member.user.tag}`, message.member.user.displayAvatarURL());
        
        message.reply({
            content: 'Created Among Us Match!',
            ephemeral: true,
        });
        channel.send({ embeds: [embed] });
    }
})