async function roleInfo(roleID, serverID, client) {
    if (!roleID || !serverID || !client) throw new Error("Some parameters are missing.")
    const guild = client.bot.guilds.cache.get(serverID);
    if (!guild) throw new Error("Server not found.");
    const role = guild.roles.cache.get(roleID);
    if (!role) throw new Error("Role not found.");

    const roleData = {
        id: role.id,
        name: role.name,
        color: role.hexColor,
        position: role.position,
        permissions: role.permissions.toArray(),
        hoist: role.hoist,
        mentionable: role.mentionable,
        assignedMembers: guild.members.cache.filter(member => member.roles.cache.has(role.id)).size,
        createdAt: role.createdAt
    };

    return roleData;
}

module.exports = roleInfo;