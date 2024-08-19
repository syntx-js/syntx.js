module.exports = async function nick(id, guildID, client) {
    if (!client || !guildID) {
        throw new Error("Client and guild must be defined.");
    }

    try {
        const guild = await client.bot.guilds.fetch(guildID);
        const member = await guild.members.fetch(id);
        return member.nickname || member.displayName;
    } catch (error) {
        throw new Error("Could not fetch user or guild.");
    }
}