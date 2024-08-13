module.exports = async function data({ channel, messageID, type }, client) {
    try {
        const targetChannel = await client.bot.channels.fetch(channel);
        if (!targetChannel) throw new Error('Channel not found');

        const message = await targetChannel.messages.fetch(messageID);
        if (!message) throw new Error('Message not found');

        if (message.embeds.length > 0) {
            const embed = message.embeds[0];
            switch (type) {
                case 'title':
                    return embed.title || null;
                case 'description':
                    return embed.description || null;
                case 'image':
                    return embed.image ? embed.image.url : null;
                case 'image':
                    return embed.image ? embed.image.url : null;
                case 'thumbnail':
                    return embed.thumbnail ? embed.thumbnail.url : null;
                case 'footer':
                    return embed.footer ? embed.footer.text : null;
                case 'footerIcon':
                    return embed.footer ? embed.footer.iconURL : null;
                case 'author':
                    return embed.author ? embed.author.name : null;
                case 'authorIcon':
                    return embed.author ? embed.author.iconURL : null;
                case 'authorURL':
                    return embed.author ? embed.author.url : null;
                case 'titleURL':
                    return embed.url || null;
                default:
                    throw new Error('Invalid type specified');
            }
        } else {
            switch (type) {
                case 'content':
                    return message.content || null;
                case 'authorId':
                    return message.author.id || null;
                case 'attachment':
                    return message.attachments.size > 0 
                        ? message.attachments.map(att => att.url)
                        : [];
                default:
                    throw new Error('Invalid type specified');
            }
        }
    } catch (error) {
        throw new Error(`An error occurred: ${error}`);
    }
};