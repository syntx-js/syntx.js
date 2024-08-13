module.exports = function content(message) {
    if (message && message.content) {
        const words = message.content.split(' ');
        const result = words.slice(1).join(' ');
        return result;
    }
    
    return '';
};