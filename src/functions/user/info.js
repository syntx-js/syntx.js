async function userInfo(userID, serverID, client) {
    if (!userID || !serverID || !client) throw new Error("Some parameters are missing.")
    const user = await client.bot.users.fetch(userID, { force: true });
    if (!user) throw new Error("User not found.");

    const fullUser = await user.fetch().catch(() => user);

    const guild = client.bot.guilds.cache.get(serverID);
    if (!guild) throw new Error("Server not found.");

    const rawUserData = await client.bot.rest.get(`/users/${userID}`);
    const member = guild.members.cache.get(userID) || await guild.members.fetch(userID).catch(() => null);

    const presence = member?.presence || null;
    const activities = presence?.activities?.map(activity => ({
        type: activity.type,
        name: activity.name,
        details: activity.details || null,
        state: activity.state || null,
        applicationId: activity.applicationId || null,
        timestamps: activity.timestamps || null,
    })) || null;

    const global = {
        id: user.id,
        username: user.username,
        displayName: user.tag,
        flags: user.flags?.toArray() || [],
        avatar: {
            id: user.avatar || null,
            url: fullUser.avatarURL() || null
        },
        decoration: rawUserData?.avatar_decoration_data || null,
        banner: {
            id: fullUser.banner || null,
            url: fullUser.bannerURL() || null
        },
        application: {
            app: user.bot,
            verified: user.bot && user.flags?.has('VERIFIED_BOT')
        },
        state: presence?.status || 'offline',
        activities: activities
    };

    const guildData = member
        ? {
            id: guild.id,
            nickname: member.nickname || null,
            avatar: {
                id: member.avatar,
                url: member.avatarURL()
            } || null,
            roles: member.roles.cache.map(role => ({
                id: role.id,
                name: role.name,
                color: role.hexColor
            })),
            joinedAt: member.joinedAt,
            premiumSince: member.premiumSince,
            permissions: member.permissions.toArray(),
            pending: member.pending,
            communicationDisabledUntil: member.communicationDisabledUntil || null
        }
        : null;

    return {
        global,
        guild: guildData
    }
}

module.exports = userInfo;