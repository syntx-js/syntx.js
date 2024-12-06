
const { Client, GatewayIntentBits, Partials, ActivityType, Events } = require('discord.js');
const { showLoadingStart, showLoadingStatus, showLoadingEnd } = require('../loaders/handler');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { Var } = require('./variables');

class ERXClient {
    constructor({ intents, prefix, token, variable = {} }) {
        this.intents = intents;
        this.prefix = prefix;
        this.token = token;
        this.commands = new Map();
        this.interactions = new Map();
        this.bot = new Client({
            intents: this.intents,
            partials: [Partials.Channel],
        });

        if (variable.enabled) {
            const variableFolder = variable.folder || './variables';

            if (!fs.existsSync(variableFolder)) {
                if (variable.folder) {
                    console.log(chalk.red(`✖ The folder "${variableFolder}" does not exist.`));
                } else {
                    fs.mkdirSync(variableFolder, { recursive: true });
                    console.log(chalk.green(`✔ Created default variables folder at "${variableFolder}"`));
                }
            }

            this.variableFolder = variableFolder;
        }

        Var.setClient(this);
    }

    new_variable({ name, value }) {
        if (!this.variableFolder) {
            throw new Error('Variable folder is not set. Ensure the "variable" option is configured correctly.');
        }

        const variable = new Var({
            name: name,
            value: value,
            folder: this.variableFolder
        });
    }

    setMaxListeners(max) {
        if (typeof max === 'number') {
            this.bot.setMaxListeners(max);
        } else {
            throw new Error('"max" must be a number. Make sure you don\'t put a high number.');
        }
    }

    ready(callback) {
        this.bot.once(Events.ClientReady, async () => {
            await callback();
        });
    }

    start() {
        this.bot.login(this.token);
    }

    kill() {
        this.bot.destroy();
    }

    command({ name, content }) {
        this.commands.set(name.toLowerCase(), content);
    }

    registerCommands() {
        this.bot.on(Events.MessageCreate, async (msg) => {
            if (msg.author.bot || msg.webhookId) return;
            if (!msg.content.startsWith(this.prefix)) return;

            const args = msg.content.slice(this.prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            const command = this.commands.get(commandName);
            if (command) {
                await command(msg);
            }
        });
    }

    handler({ commands, events, interactions }, showLoad = false) {
        const loadItems = (type, dirPath) => {
            if (!fs.existsSync(dirPath)) {
                if (showLoad) console.log(chalk.red(`Path not found: ${dirPath}`));
                return 0;
            }
    
            const items = fs.readdirSync(dirPath);
            let failedItems = 0;
            let loadedItems = 0;
    
            items.forEach((file) => {
                const filePath = path.join(dirPath, file);
                const stat = fs.statSync(filePath);
    
                if (stat.isDirectory()) {
                    const { failed, loaded } = loadItems(type, filePath);
                    failedItems += failed;
                    loadedItems += loaded;
                } else if (file.endsWith('.js')) {
                    try {
                        const item = require(filePath);
                        const id = item.id || file.replace('.js', '');
                        const labelType = type === 'commands'
                            ? chalk.gray('(command)')
                            : type === 'events'
                            ? chalk.gray('(event)')
                            : chalk.gray('(interaction)');
                        const fullLabel = `${id} ${labelType}`.padEnd(50, ' ');
    
                        if (type === 'commands') {
                            this.command({ name: id, content: item.content });
                        } else if (type === 'events') {
                            this.event(item.event, item.content);
                        } else if (type === 'interactions') {
                            const { content, separator = '-' } = item;
                            this.interaction({ id, content, separator });
                        }
    
                        if (showLoad) {
                            showLoadingStatus(fullLabel, 'success');
                        }
                        loadedItems++;
                    } catch (error) {
                        failedItems++;
                        if (showLoad) {
                            const fullLabel = `${file} ${chalk.red('(error)')}`.padEnd(50, ' ');
                            showLoadingStatus(fullLabel, 'error');
                        }
                    }
                }
            });
    
            return { failed: failedItems, loaded: loadedItems };
        };
    
        if (showLoad) showLoadingStart();
    
        let totalFailed = 0;
        let totalLoaded = 0;
    
        if (commands) {
            const commandsPath = path.resolve(commands);
            const { failed, loaded } = loadItems('commands', commandsPath);
            totalFailed += failed;
            totalLoaded += loaded;
        }
    
        if (events) {
            const eventsPath = path.resolve(events);
            const { failed, loaded } = loadItems('events', eventsPath);
            totalFailed += failed;
            totalLoaded += loaded;
        }
    
        if (interactions) {
            const interactionsPath = path.resolve(interactions);
            const { failed, loaded } = loadItems('interactions', interactionsPath);
            totalFailed += failed;
            totalLoaded += loaded;
        }
    
        if (showLoad) showLoadingEnd(totalFailed, totalLoaded);
    }    

    event(name, callback) {
        const eventPath = path.join(__dirname, '../events', `${name}.js`);

        if (fs.existsSync(eventPath)) {
            const event = require(eventPath);
            this.bot.on(event.trigger, async (...args) => {
                if (event.condition(...args)) {
                    await callback(...args);
                }
            });
        } else if (Object.values(Events).includes(name)) {
            this.bot.on(name, async (...args) => {
                await callback(...args);
            });
        } else {
            throw new Error(`Event "${name}" not found in the events directory or Discord.js.`);
        }
    }

    presence({ time, activities, status = 'online' }) {
        if (!Array.isArray(activities) || activities.length === 0) {
            throw new Error('"activities" must be a non-empty array.');
        }

        this.bot.once(Events.ClientReady, () => {
            let currentIndex = 0;

            const updatePresence = () => {
                const activity = activities[currentIndex];
                if (activity) {
                    const activityType = this.getActivityType(activity.type);
                    this.bot.user.setPresence({
                        activities: [{ name: activity.content, type: activityType }],
                        status: status.toLowerCase()
                    });
                    currentIndex = (currentIndex + 1) % activities.length;
                }
            };

            updatePresence();
            setInterval(updatePresence, time * 1000);
        });
    }

    getActivityType(type) {
        switch (type.toLowerCase()) {
            case 'playing':
                return ActivityType.Playing;
            case 'streaming':
                return ActivityType.Streaming;
            case 'listening':
                return ActivityType.Listening;
            case 'watching':
                return ActivityType.Watching;
            case 'competing':
                return ActivityType.Competing;
            default:
                return ActivityType.Playing;
        }
    }

    interaction({ id, content, separator = '-' }) {
        const dynamicPattern = id
            .replace(/\{(.*?)\}/g, `(?<$1>[^${separator}]+)`) // Reemplaza {value} con un grupo dinámico
            .replace(new RegExp(`\\${separator}`, 'g'), `\\${separator}`); // Escapa el separador si es especial
    
        this.interactions.set(dynamicPattern, { content, separator });
    }
    
    registerInteractions() {
        this.bot.on(Events.InteractionCreate, async (interaction) => {
            if (interaction.isButton() || interaction.isSelectMenu()) {
                const customId = interaction.customId;
    
                for (const [pattern, { content, separator }] of this.interactions.entries()) {
                    const regex = new RegExp(`^${pattern}$`);
                    const match = customId.match(regex);
    
                    if (match) {
                        const dynamicValues = match.groups || {};
                        await content(interaction, dynamicValues, separator); // Pasamos los valores y el separador
                        return;
                    }
                }
    
                // Si no coincide ningún patrón
                console.log(`No matching interaction found for ID: ${customId}`);
            }
        });
    }    
}

module.exports = ERXClient;