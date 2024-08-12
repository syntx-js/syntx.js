module.exports = function guildId(message) {
    if (message.guild) {
        return message.guild.id;
    }
    
    return null;
};