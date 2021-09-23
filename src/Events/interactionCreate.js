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

    if (client.cooldownCommands.has(`${interaction.member.id}-${command.name}`)) return interaction.reply({
        content: `❌ Woah, slow down! Command Cooldown is ${command.cooldown} seconds!`,
        ephemeral: true,
    });

    const permission = interaction.member.permissions.has(command.permission);

    if (!permission) return interaction.reply({
        content: "❌ It looks like you don't have the correct permissions to run this command!",
        ephemeral: true,
    });
    try {
        await command.run(client, interaction, args);

        if (!command.cooldown <= 0) {
            client.cooldownCommands.add(`${interaction.member.id}-${command.name}`)
            setTimeout(() => {
                client.cooldownCommands.delete(`${interaction.member.id}-${command.name}`)
            }, 1000 * command.cooldown);
        }

    } catch (error) {
        return interaction.reply({
            content: `⚠️ An error has occured and has been reported to developers.\nContact owner ${client.owner.tag} if this happens again`,
            ephemeral: true,
        });
    }
})