module.exports = async function send({ text, channel, returnId = false, options: { reply = false, ping = true } = {} }, message) {
    if (typeof text !== 'string' && typeof text !== 'object') {
        throw new Error('Text must be a string or an object');
    }

    if (channel && typeof channel !== 'string') {
        throw new Error('Channel must be a string');
    }

    const targetChannel = channel ? message.client.channels.cache.get(channel.toString()) : message.channel;

    if (!targetChannel) {
        throw new Error('Channel not found');
    }

    const messageOptions = {
        allowedMentions: { repliedUser: ping, users: ping ? [message.author.id] : [] },
    };

    if (typeof text === 'string') {
        messageOptions.content = text;
    } else if (typeof text === 'object') {
        if (text.embeds) {
            messageOptions.embeds = text.embeds;
        }
        if (text.content) {
            messageOptions.content = text.content;
        }
    }

    let sentMessage;

    if (reply) {
        sentMessage = await message.reply(messageOptions);
    } else {
        sentMessage = await targetChannel.send(messageOptions);
    }

    if (returnId) {
        return sentMessage.id;
    }

    return null;
};