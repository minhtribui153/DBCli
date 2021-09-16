const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
    name: 'balance',
    description: 'Checks your balance',
    type: 'SLASH',
    slashCommandOptions: [],
    permission: 'SEND_MESSAGES',
    async run (client, message, args) {
        const user = client.mongoCurrency.findUser(message.user.id, message.guild.id);

        const embed = new MessageEmbed()
            .setAuthor(message.user.username, message.user.avatarURL({ dynamic: true }))
            .setTitle(`${message.user.username}'s Balance`)
            .addField('Wallet', `${user.coinsInWallet}`, false)
            .addField('Bank', `${user.coinsInBank}/${user.bankSpace}`, false);
        
        message.reply({ embeds: [embed] });
    }
});