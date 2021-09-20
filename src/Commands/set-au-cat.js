const Command = require('../Structures/Command');

module.exports = new Command({
    name: 'set-among-us-category',
    description: 'Sets an Among Us Category for an Among Us Game',
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'category_id',
            description: 'Enter the category ID for the Among Us Game',
            type: 'STRING',
            required: true,
        },
    ],
    permission: 'ADMINISTRATOR',

    run: async (client, message, args) => {
        const AmongUsCategorySchema = client.schemas.AmongUsCategorySchema;

        const categoryId = message.options.getString('category_id');

        await AmongUsCategorySchema.findOneAndUpdate(
            {
                _id: message.guild.id,
            },
            {
                _id: message.guild.id,
                categoryId,
            },
            {
                upsert: true,
            },
        );

        message.reply({
            content: 'Among Us Category Set!',
            ephemeral: true,
        });
    }
})