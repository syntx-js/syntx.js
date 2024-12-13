async function updateNick({ userID, serverID, nick }, client) {
    if (!userID ||!nick ||!serverID || !client) throw new Error("Missing required parameters.");

    const guild = client.bot.guilds.cache.get(serverID);
    if (!guild) throw new Error("Server not found.");

    const member = await guild.members.fetch(userID).catch(() => null);
    if (!member) throw new Error("User not found in the server.");

    await member.setNickname(nick).catch(err => {
        throw new Error(`Failed to update nickname: ${err.message}`);
    });
}

module.exports = updateNick;