module.exports = async function send(
    { text, channel, returnId = false, components = [], files = [], options: { reply = false, ping = true } = {} },
    message
) {
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

    const formattedComponents = components.flatMap(row => {
        if (Array.isArray(row)) {
            return row.map(component =>
                typeof component.toJSON === 'function' ? component.toJSON() : component
            );
        } else if (typeof row.toJSON === 'function') {
            return [row.toJSON()];
        } else if (row.type === 1 && Array.isArray(row.components)) {
            return [row];
        }
        throw new Error('Invalid component format: Components must be serialized.');
    });

    const messageOptions = {
        allowedMentions: { repliedUser: ping, users: ping ? [message.author.id] : [] },
        components: formattedComponents,
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

    // Agregar archivos si existen
    if (Array.isArray(files) && files.length > 0) {
        messageOptions.files = files;
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