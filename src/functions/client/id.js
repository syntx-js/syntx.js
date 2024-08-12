module.exports = function id(client) {
    if (!client) {
        throw new Error("Client must be defined.")
    }

    return client.bot.user.id;
}