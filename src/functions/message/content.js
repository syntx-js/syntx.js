module.exports = function content(message, firstArgument = false) {
    if (message && message.content) {
        const words = message.content.split(' ');
        
        const result = firstArgument ? words.join(' ') : words.slice(1).join(' ');
        
        return result;
    }
    
    return '';
};