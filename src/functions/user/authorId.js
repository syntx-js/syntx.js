module.exports = function authorId(message) {
    if (!message || !message.author) {
        throw new Error("Message or author not defined.");
    }
    return message.author.id;
}
