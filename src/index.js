const discord = require("discord.js");
const ERXClient = require("./classes/client");
const Embed = require("./classes/embed")
const { Var } = require("./classes/variables");
const text = require("./functions/random/text");
const number = require("./functions/random/number");
const intents = require("./intents/intents");
const argument = require("./functions/message/argument");
const send = require("./functions/message/sendMessage");
const clientId = require("./functions/client/id");
const username = require("./functions/user/username")
const authorId = require("./functions/user/authorId");
const avatar = require("./functions/user/avatar");
const mentioned = require("./functions/message/mentioned");
const guildId = require("./functions/guild/id")
const say = require("./functions/message/say");
const data = require("./functions/message/data");
const channelId = require("./functions/channel/id")

module.exports = {
    ...discord,
    ERXClient,
    Intents: intents,
    Embed,
    Var,
    cmd: {
        random: {
            text,
            number
        },
        channel: {
            id: channelId
        },
        message: {
            argument,
            send,
            mentioned,
            say,
            data
        },
        client: {
            id: clientId
        },
        user: {
            username,
            authorId,
            avatar
        },
        guild: {
            id: guildId
        }
    }
};