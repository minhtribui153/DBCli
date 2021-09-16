const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Event = require('../Structures/Event');

module.exports = new Event('interactionCreate', async (client, interaction) => {
    // await interaction.deferUpdate();
    if (interaction.isButton()) {
        if (interaction.customId === 'req') {
            const thread = await interaction.channel.threads.create({
                name: `Slot ${interaction.user.username}#${interaction.user.discriminator}`,
                autoArchiveDuration: 1440,
            });
            await thread.setLocked(true);
            const embed = new MessageEmbed()
                .setTitle('Ticket')
                .setDescription(`Hi there <@${interaction.user.id}>,\nType in what you wanted to register so that Moderators and Owners can apply for you!\nThank you!\n\nRegards,\n${client.user.tag}`)
                .setColor('YELLOW')
                .setTimestamp()
                .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                    dynamic: true,
                }));
                const del = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('deleteReg')
                    .setLabel('❌ Delete Slot!')
                    .setStyle('DANGER'),
                );
            interaction.user.send('Your registration slot has been opened!');
            thread.send({
                content: `Welcome <@${interaction.user.id}>`,
                embeds: [embed],
                components: [del]
            }).then(interaction.reply({
                content: 'Created Registration Slot!',
                ephemeral: true
            }));
            setTimeout(() => {
                interaction.channel.bulkDelete(1)
            }, 5000)
        } else if (interaction.customId === 'deleteReg') {

            const thread = interaction.channel
            thread.delete();

        }
    }
})