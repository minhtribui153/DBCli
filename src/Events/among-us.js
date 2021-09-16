const Event = require('../Structures/Event');

const channelNameStart = "Among Us"

module.exports = new Event('voiceStateUpdate', (client, oldState) => {
    const { channel } = oldState;

    if (
        channel &&
        channel.name.startsWith(channelNameStart) &&
        channel.members.size === 0
    ) {
        channel.delete();
    }
})