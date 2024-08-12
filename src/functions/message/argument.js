module.exports = function argument(msg, index) {
    const prefix = msg.client.prefix || '';
    if (!msg.content.startsWith(prefix)) {
        throw new Error('Message does not start with the correct prefix');
    }
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    return args[index] || null;
};
