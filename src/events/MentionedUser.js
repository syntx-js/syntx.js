module.exports = {
    trigger: 'messageCreate',
    condition: (msg) => msg.mentions.users.size > 0
};