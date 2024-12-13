async function serverInfo(serverID, client) {
    if (!client || !serverID) throw new Error("Some parameters are missing.")
    const guild = client.bot.guilds.cache.get(serverID);
    if (!guild) throw new Error("Server not found.");

    const owner = await guild.fetchOwner();
    const invites = await guild.invites.fetch().catch(() => []);

    const permanentInvite = invites.find(inv => !inv.expiresAt)?.url || null;

    const serverData = {
        id: guild.id,
        name: guild.name,
        icon: {
            id: guild.icon,
            url: guild.iconURL({ dynamic: true, size: 512 })
        },
        ownerId: owner.id,
        boostCount: guild.premiumSubscriptionCount,
        boostLevel: guild.premiumTier,
        emojis: guild.emojis.cache.map(emoji => ({
            id: emoji.id,
            name: emoji.name,
            url: emoji.imageURL({ extension: emoji.animated ? 'gif' : 'png' })
        })),
        roles: guild.roles.cache.map(role => ({
            id: role.id,
            name: role.name,
            color: role.hexColor,
            permissions: role.permissions.toArray(),
            hoist: role.hoist,
            position: role.position,
            mentionable: role.mentionable
        })),
        description: guild.description || null,
        banner: guild.bannerURL({ dynamic: true, size: 512 }) || null,
        splash: guild.splashURL({ dynamic: true, size: 512 }) || null,
        discoverySplash: guild.discoverySplashURL({ dynamic: true, size: 512 }) || null,
        nsfwLevel: guild.nsfwLevel,
        memberCount: guild.memberCount,
        approximateMemberCount: guild.approximateMemberCount || null,
        approximatePresenceCount: guild.approximatePresenceCount || null,
        createdAt: guild.createdAt,
        features: guild.features,
        systemChannel: guild.systemChannel?.id || null,
        afkChannel: guild.afkChannel?.id || null,
        afkTimeout: guild.afkTimeout || null,
        widgetEnabled: guild.widgetEnabled,
        widgetChannel: guild.widgetChannel?.id || null,
        rulesChannel: guild.rulesChannel?.id || null,
        publicUpdatesChannel: guild.publicUpdatesChannel?.id || null,
        preferredLocale: guild.preferredLocale,
        permanentInvite: permanentInvite
    };

    return serverData;
}

module.exports = serverInfo;