module.exports = function mentionedChannel(message, index = 1) {
    const mentions = message.mentions.channels;
    
    if (mentions.size > 0) {
        const mentionedChannelsArray = Array.from(mentions.values());
        const mentionedChannel = mentionedChannelsArray[index - 1];
        
        if (mentionedChannel) {
            return mentionedChannel.id;
        }
    }
    
    return null;
};
