const Event = require("../Structures/Event");
const { author } = require("../../package.json");

module.exports = new Event("messageCreate", async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(client.config.prefix)) return;
    const args = message.content.substring(client.config.prefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name == args[0]);

    if (!command) return message.reply(`❌ Command \`${args[0]}\` is invalid!`);

    if (client.cooldownCommands.has(`${message.member.id}-${command.name}`)) return message.reply({
        content: `❌ Woah, slow down! Command Cooldown is ${command.cooldown} seconds!`,
        ephemeral: true,
    });

    if (!["BOTH", "TEXT"].includes(command.type)) return message.reply("❌ This command is only available for Slash Commands!");

    const permission = message.member.permissions.has(command.permission);

    if (!permission) return message.reply(`❌ You need \`${command.permission}\` to run \`${command.name}\` command!`);

    try {
        (await command).run(client, message, args);
        if (!command.cooldown <= 0) {
            client.cooldownCommands.add(`${message.member.id}-${command.name}`)
            setTimeout(() => {
                client.cooldownCommands.delete(`${message.member.id}-${command.name}`)
            }, 1000 * command.cooldown);
        }
    } catch (error) {
        return message.reply(`Command \`${command.name}\` ran into an error.\nThis error has been reported to the developers.\nIf this happens again, please contact \`${author}\`.`);
    }
});