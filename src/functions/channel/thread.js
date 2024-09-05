const { ChannelType, ThreadAutoArchiveDuration } = require('discord.js');

module.exports = async function thread({ channelID, messageID, name, duration, returnID = false }, client) {
    if (!client) throw new TypeError('Client is required.');
    if (!channelID || !messageID || !name || !duration) throw new TypeError('Invalid arguments provided.');

    const channel = await client.bot.channels.fetch(channelID);
    if (!channel || channel.type !== ChannelType.GuildText) throw new Error('Invalid channel or channel type.');

    const message = await channel.messages.fetch(messageID);
    if (!message) throw new Error('Message not found.');

    const validDurations = Object.values(ThreadAutoArchiveDuration);
    if (!validDurations.includes(duration)) throw new Error('Invalid thread archive duration.');

    const thread = await message.startThread({
        name: name,
        autoArchiveDuration: duration,
    });

    if (!thread) throw new Error('Failed to create thread.');

    return returnID ? thread.id : undefined;
};