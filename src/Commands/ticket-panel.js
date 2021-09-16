const Command = require("../Structures/Command");
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = new Command({
    name: "ticketing",
    description: "Sends in ticket-panel",
    type: "SLASH",
    permission: 'ADMINISTRATOR',
    async run(client, message, args) {
        const embed = new MessageEmbed()
            .setColor(message.guild.userinfoget.displayHexColor())
            .setAuthor(message.guild.name, message.guild.iconURL({
                dynamic: true
            }))
            .setTitle(`Server Ticketing`)
            .setDescription(
                "> 1. Click on the button to Create a Ticket\n> \n" +

                "> 2. Once the ticket is made you will be able to type in there"

            )


        const bt = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ticket')
                    .setLabel('🎫 Create Ticket!')
                    .setStyle('PRIMARY'),
                );

        message.reply({
            content: 'Ticket Panel Activated!',
            ephemeral: true,
        })
        message.channel.send({
            embeds: [embed],
            components: [bt]
        });
    }
});