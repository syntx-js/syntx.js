async function addRole({ userID, serverID, roleID }, client) {
    if (!userID ||!roleID ||!serverID || !client) throw new Error("Missing required parameters.");

    const guild = client.bot.guilds.cache.get(serverID);
    if (!guild) throw new Error("Server not found.");

    const member = await guild.members.fetch(userID).catch(() => null);
    if (!member) throw new Error("User not found in the server.");

    const role = guild.roles.cache.get(roleID);
    if (!role) throw new Error("Role not found.");

    await member.roles.add(role).catch(err => {
        throw new Error(`Failed to add role: ${err.message}`);
    });
}

module.exports = addRole;