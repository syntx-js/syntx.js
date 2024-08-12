const { GatewayIntentBits } = require('discord.js');

const all = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution
]

const fast = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
]

module.exports = {
    Guilds: GatewayIntentBits.Guilds,
    GuildMembers: GatewayIntentBits.GuildMembers,
    GuildBans: GatewayIntentBits.GuildBans,
    GuildEmojisAndStickers: GatewayIntentBits.GuildEmojisAndStickers,
    GuildIntegrations: GatewayIntentBits.GuildIntegrations,
    GuildWebhooks: GatewayIntentBits.GuildWebhooks,
    GuildInvites: GatewayIntentBits.GuildInvites,
    GuildVoiceStates: GatewayIntentBits.GuildVoiceStates,
    GuildPresences: GatewayIntentBits.GuildPresences,
    GuildMessages: GatewayIntentBits.GuildMessages,
    GuildMessageReactions: GatewayIntentBits.GuildMessageReactions,
    GuildMessageTyping: GatewayIntentBits.GuildMessageTyping,
    DirectMessages: GatewayIntentBits.DirectMessages,
    DirectMessageReactions: GatewayIntentBits.DirectMessageReactions,
    DirectMessageTyping: GatewayIntentBits.DirectMessageTyping,
    MessageContent: GatewayIntentBits.MessageContent,
    GuildScheduledEvents: GatewayIntentBits.GuildScheduledEvents,
    AutoModerationConfiguration: GatewayIntentBits.AutoModerationConfiguration,
    AutoModerationExecution: GatewayIntentBits.AutoModerationExecution,
    All: all,
    Fast: fast
};
