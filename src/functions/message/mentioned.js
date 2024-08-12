module.exports = function mentioned(message, index = 1) {
    const mentions = message.mentions.users;
    
    if (mentions.size > 0) {
        const mentionedUsersArray = Array.from(mentions.values());
        const mentionedUser = mentionedUsersArray[index - 1];
        
        if (mentionedUser) {
            return mentionedUser.id;
        }
    }
    
    return null;
};