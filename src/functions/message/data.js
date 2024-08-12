module.exports = async function data({ channel, messageID, type }) {
    try {
        const targetChannel = await client.channels.fetch(channel);
        const message = await targetChannel.messages.fetch(messageID);
        
        if (!message) return null;

        if (message.embeds.length > 0) {
            const embed = message.embeds[0];

            switch (type) {
                case 'title':
                    return embed.title || null;
                case 'description':
                    return embed.description || null;
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
                    return null;
            }
        } else {
            if (type === 'content') {
                return message.content || null;
            } else {
                return null;
            }
        }
    } catch (error) {
        console.error('Error fetching message data:', error);
        return null;
    }
};