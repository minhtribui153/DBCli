const Event = require("../Structures/Event");

module.exports = new Event("interactionCreate", async (client, interaction) => {
    if (interaction.user.bot || !interaction.isCommand() || !interaction.guild) return;

    const args = [
        interaction.commandName,
        ...client.commands
            .find(cmd => cmd.name == interaction.commandName)
            .slashCommandOptions.map(v => `${interaction.options.get(v.name).value}`)
    ];

    const command = client.commands.find(cmd => cmd.name == interaction.commandName);

    if (!command) return interaction.reply({
        content: "❌ Invalid Command!",
        ephemeral: true,
    });

    const permission = interaction.member.permissions.has(command.permission);

    if (!permission) return interaction.reply({
        content: "❌ It looks like you don't have the correct permissions to run this command!",
        ephemeral: true,
    });
    try {
        command.run(client, interaction, args);
    } catch (error) {
        return interaction.reply({
            content: `⚠️ An error has occured and has been reported to developers.\nContact owner ${client.owner.tag} if this happens again`,
            ephemeral: true,
        });
    }
})