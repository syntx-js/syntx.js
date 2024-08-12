module.exports = async function username(id, client) {
    if (!client) {
        throw new Error("Client must be defined.");
    }

    try {
        const user = await client.bot.users.fetch(id);
        return user.username;
    } catch (error) {
        throw new Error("Could not fetch user.");
    }
}