const Event = require("../Structures/Event");
const config = require('../Data/config.json');

const presence = [
    'Discord API',
    'Slash Commands',
    `Prefix: ${config.prefix}`,
];

module.exports = new Event("ready", (client) => {
    console.log(`[INFO] Bot ${client.user.tag} is ready`);
    setInterval(() => {
        client.user.setActivity(presence[Math.floor(Math.random() * presence.length)], { type: "LISTENING" });
    }, 5000);
    console.log('[STATUS] Connected to Discord API');
});