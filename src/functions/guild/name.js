module.exports = async function name(guildId, client) {
    if (!client || !guildId) {
        throw new Error("Client and guildId must be defined.");
    }

    try {
        const guild = await client.bot.guilds.fetch(guildId);
        return guild.name;
    } catch (error) {
        throw new Error("Could not fetch guild.");
    }
}
