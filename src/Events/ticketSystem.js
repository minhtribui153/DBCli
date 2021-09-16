const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Event = require('../Structures/Event');

module.exports = new Event('interactionCreate', async (client, interaction) => {
    // await interaction.deferUpdate();
    if (interaction.isButton()) {
        if (interaction.customId === 'ticket') {
            const thread = await interaction.channel.threads.create({
                name: `Ticket ${interaction.user.username}#${interaction.user.discriminator}`,
                autoArchiveDuration: 1440,
            });
            await thread.setLocked(true);
            const embed = new MessageEmbed()
                .setTitle('Ticket')
                .setDescription(`Hi there <@${interaction.user.id}>,\nStaff members and Administrators will be here as soon as possible!\nMeanwhile, tell us about your issue here!\nTo get a person inside this ticket, mention them!\nThank you!\n\nRegards,\n${client.user.tag}`)
                .setColor('GREEN')
                .setTimestamp()
                .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                    dynamic: true,
                }));
                const del = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('deleteTicket')
                        .setLabel('✅ Resolve Ticket!')
                    .setStyle('SUCCESS'),
                );
            interaction.user.send('Your ticket has been opened!');
            thread.send({
                content: `Welcome <@${interaction.user.id}>`,
                embeds: [embed],
                components: [del]
            }).then(interaction.reply({
                content: 'Created Ticket!',
                ephemeral: true
            }));
            setTimeout(() => {
                interaction.channel.bulkDelete(1)
            }, 5000)
        } else if (interaction.customId === 'deleteTicket') {

            const thread = interaction.channel
            thread.delete();

        }
    }
})