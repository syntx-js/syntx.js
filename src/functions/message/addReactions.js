module.exports = async function addReactions({ channelID, messageID, reactions }, client) {
    if (typeof channelID !== 'string') {
        throw new TypeError('Channel ID must be a string.');
    }

    if (typeof messageID !== 'string') {
        throw new TypeError('Message ID must be a string.');
    }

    if (!Array.isArray(reactions) || reactions.length === 0) {
        throw new TypeError('Reactions must be a non-empty array of strings.');
    }

    const targetChannel = client.bot.channels.cache.get(channelID);

    if (!targetChannel) {
        throw new Error('Channel not found.');
    }

    let targetMessage;
    try {
        targetMessage = await targetChannel.messages.fetch(messageID);
    } catch (error) {
        throw new Error('Message not found or could not be fetched.');
    }

    if (!targetMessage) {
        throw new Error('Message not found.');
    }

    try {
        for (const reaction of reactions) {
            await targetMessage.react(reaction);
        }
    } catch (error) {
        throw new Error('Failed to add one or more reactions: ' + error.message);
    }
};