module.exports = async function edit({ data: { channel, message }, content }, client) {
    if (typeof channel !== 'string') {
        throw new TypeError('Channel must be a string.');
    }

    if (typeof message !== 'string') {
        throw new TypeError('Message ID must be a string.');
    }

    if (typeof content !== 'string') {
        throw new TypeError('Content must be a string.');
    }

    const targetChannel = client.bot.channels.cache.get(channel.toString());
    
    if (!targetChannel) {
        throw new Error('Channel not found.');
    }

    const targetMessage = await targetChannel.messages.fetch(message.toString());

    if (!targetMessage) {
        throw new Error('Message not found.');
    }

    if (targetMessage.author.id !== client.bot.user.id) {
        throw new Error('You can only edit messages sent by the bot.');
    }

    await targetMessage.edit(content);
};
