module.exports = async function avatar(id, message, options = {}) {
    let user;
    const { format, size } = options;

    if (!id) {
        user = message.author;
    } else {
        try {
            user = await message.client.users.fetch(id);
        } catch (error) {
            throw new Error(`Error fetching user with ID ${id}: ${error.message}`);
        }
    }

    return user.displayAvatarURL({ format: format || 'png', size: size || 128 });
}