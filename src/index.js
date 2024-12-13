const discord = require("discord.js");
const ERXClient = require("./classes/client");
const Embed = require("./classes/embed")
const { Var } = require("./classes/variables");
const Buttons = require("./classes/interactions/buttons");
const SelectMenus = require("./classes/interactions/selectMenus");
const text = require("./functions/random/text");
const number = require("./functions/random/number");
const intents = require("./intents/intents");
const argument = require("./functions/message/argument");
const send = require("./functions/message/sendMessage");
const clientId = require("./functions/client/id");
const username = require("./functions/user/username")
const authorId = require("./functions/user/authorId");
const avatar = require("./functions/user/avatar");
const mentionedUser = require("./functions/message/mentioned");
const guildId = require("./functions/guild/id")
const content = require("./functions/message/content");
const data = require("./functions/message/data");
const channelId = require("./functions/channel/id");
const ping = require("./functions/client/ping");
const mentionedChannel = require("./functions/channel/mentioned");
const perms = require("./functions/user/perms");
const nick = require("./functions/user/nick");
const displayName = require("./functions/user/displayName");
const name = require("./functions/guild/name");
const edit = require("./functions/message/edit");
const addReactions = require("./functions/message/addReactions");
const messageId = require("./functions/message/id");
const thread = require("./functions/channel/thread");
const editButton = require("./functions/message/edit/editButtons")
const userInfo = require("./functions/user/info")
const serverInfo = require("./functions/guild/info");
const channelInfo = require("./functions/channel/info");
const roleInfo = require("./functions/role/info")
const addRole = require("./functions/user/edit/roles/add")
const removeRole = require("./functions/user/edit/roles/remove")
const updateUser = require("./functions/user/edit/nick")

module.exports = {
    ...discord,
    ERXClient,
    Intents: intents,
    Embed,
    Var,
    Buttons,
    SelectMenus,
    cmd: {
        random: {
            text,
            number
        },
        channel: {
            id: channelId,
            mentioned: mentionedChannel,
            create: {
                thread
            },
            info: channelInfo
        },
        role: {
            info: roleInfo
        },
        message: {
            argument,
            send,
            mentioned: mentionedUser,
            id: messageId,
            content,
            data,
            addReactions,
            edit: Object.assign(edit, { buttons: editButton })
        },
        client: {
            id: clientId,
            ping
        },
        user: {
            username,
            authorId,
            avatar,
            perms,
            nick,
            displayName,
            info: userInfo,
            edit: {
                nick: updateUser,
                roles: {
                    add: addRole,
                    remove: removeRole
                }
            }
        },
        guild: {
            id: guildId,
            name,
            info: serverInfo
        }
    }
};