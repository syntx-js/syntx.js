async function channelInfo(channelID, client) {
    if (!channelID || !client) throw new Error("Some parameters are missing.")
    const channel = client.bot.channels.cache.get(channelID);
    if (!channel) throw new Error("Channel not found.");

    const channelData = {
        id: channel.id,
        name: channel.name,
        type: channel.type,
        description: channel.topic || null,
        nsfw: channel.nsfw || false,
        position: channel.rawPosition || null,
        bitrate: channel.bitrate || null,
        userLimit: channel.userLimit || null,
        parentID: channel.parentId || null,
        permissions: channel.permissionOverwrites.cache.map(perm => ({
            id: perm.id,
            type: perm.type,
            allow: perm.allow.toArray(),
            deny: perm.deny.toArray()
        })),
        rateLimit: channel.rateLimitPerUser || null,
        url: channel.isTextBased() ? channel.url : null,
        threads: channel.threads?.cache.map(thread => ({
            id: thread.id,
            name: thread.name,
            createdAt: thread.createdAt
        })) || null
    };

    return channelData;
}

module.exports = channelInfo;