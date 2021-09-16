const fetch = require('node-fetch');
const Event = require('../Structures/Event');
const ChatbotSchema = require('../Schemas/ChatbotSchema');

module.exports = new Event("messageCreate", async (client, message) => {
    if (message.author.bot) return;
    ChatbotSchema.findOne({ guild: message.guild.id }, async (err, data) => {
        if (!data) return;
        if (err) throw err;
        const channel = data.channel


        if (message.channel.id === channel) {
            fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}&yr0n57JXpCy7aXlzFmMchuas`) // API for ChatBot
                .then(response => response.json())
                .then(data => {
                    message.reply(`> ${data.response}`)
                }).catch(error => {
                    return
                });
        }
    })
})