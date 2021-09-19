const Command = require("../Structures/Command");

module.exports = new Command({
    name: "registering",
    description: "Sends in register-panel",
    type: "SLASH",
    permission: 'ADMINISTRATOR',
    async run(client, message, args) {
        const embed = new client.main.MessageEmbed()
            .setColor('RED')
            .setAuthor(message.guild.name, message.guild.iconURL({
                dynamic: true
            }))
            .setTitle(`Server Registering`)
            .setDescription(
                "> 1. Click on the button to Create a Register slot\n> \n" +

                "> 2. Once the ticket is made you will be able to type in there"

            )


        const bt = new client.main.MessageActionRow()
            .addComponents(
                new client.main.MessageButton()
                    .setCustomId('req')
                    .setLabel('🎫 Register Slot!')
                    .setStyle('SECONDARY'),
                );

        message.reply({
            content: 'Register Panel Activated!',
            ephemeral: true,
        })
        message.channel.send({
            embeds: [embed],
            components: [bt]
        });
    }
});