const Event = require("../Structures/Event");
const { author } = require("../../package.json");

module.exports = new Event("messageCreate", async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(client.prefix)) return;
    const args = message.content.substring(client.prefix.length).split(/ +/);
    
    const command = client.commands.find(cmd => cmd.name == args[0]);

    if (!command) return message.reply(`❌ Command \`${args[0]}\` is invalid!`);

    if (!["BOTH", "TEXT"].includes(command.type)) return message.reply("❌ This command is only available for Slash Commands!");

    const permission = message.member.permissions.has(command.permission);

    if (!permission) return message.reply(`❌ You need \`${command.permission}\` to run \`${command.name}\` command!`);
    
    try {
        (await command).run(client, message, args); 
    } catch (error) {
        return message.reply(`Command \`${command.name}\` ran into an error.\nThis error has been reported to the developers.\nIf this happens again, please contact \`${author}\`.`);
    }
});