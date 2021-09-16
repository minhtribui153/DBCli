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

    client.distube
        .on("playSong", (message, queue, song) => message.reply(
            `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
        ))
        .on("addSong", (message, queue, song) => message.reply(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
        ))
        .on("playList", (message, queue, playlist, song) => message.reply(
            `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
        ))
        .on("addList", (message, queue, playlist) => message.reply(
            `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
        ))
        // DisTubeOptions.searchSongs = true
        .on("searchResult", (message, result) => {
            let i = 0;
            message.reply(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
        })
        // DisTubeOptions.searchSongs = true
        .on("searchCancel", (message) => message.reply(`Searching canceled`))
        .on("error", (message, e) => {
            console.error(e)
            message.reply("An error encountered: " + e);
        });
        console.log('[INFO] Distube Initialized')
});