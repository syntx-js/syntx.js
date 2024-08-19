module.exports = function messageId(message) {
    if (!message) {
        throw new Error('Add the "message" parameter.');
    }

    return message.id;
}