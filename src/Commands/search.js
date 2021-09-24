const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'search',
    description: 'Search for some coins',
    cooldown: 5,
    type: 'BOTH',
    slashCommandOptions: [
    ],
    run: async (client, message, args) => {
        const check = client.function.currency.account.checkForAccount(message);

        if (!check) return message.reply({
            content: '❌ No Currency Account Found! Please create one!',
            ephemeral: true
        })


        const locations = [
            "pocket",
            "car",
            "bathroom",
            "park",
            "truck",
            "car",
            "cupboard",
            "carpet",
            "bedroom",
            "drawer",
            "books",
            "kitchen",
            "computer",
            "iPad",
            "iPhone",
            "DMs",
            "shoe",
            "bushes",
        ];

        const chosenLocations = locations.sort(() => Math.random() - Math.random()).slice(0, 3);

        const filter = ({ author, content }) => message.author === author && chosenLocations.some((location) => location.toLowerCase() === content.toLowerCase());

        const collector = message.channel.createMessageCollector(filter, { max: 1, time: 25000 });

        const earnings = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

        collector.on('collect', message => {
            if (chosenLocations.some((location) => location.toLowerCase() === message.content.toLowerCase())) {
                const locate = chosenLocations.filter((location) => location.toLowerCase() === message.content.toLowerCase())[0];

                const check = [
                    "Yes",
                    "No",
                ];

                const use = client.function.choose(check);

                if (use === "Yes") {
                    message.channel.send(`You searched your ${locate} and found 🪙 ${earnings} coins!`);
                    client.function.currency.account.giveCoins(message, earnings);
                } else if (use === "No") {
                    message.channel.send(`❌ You searched your ${locate} and found NOTHING LMAO 🤣!`);
                }
            }
        });

        collector.on('end', async (collected, reason) => {
            if (reason == "time") {
                message.channel.send('❌ You ran out of time to search!')
            }
        });

        message.reply({
            content: `Where do you want to search?\nType the location in this channel!\n\`${chosenLocations.join('` `')}\``
        })
    }
})