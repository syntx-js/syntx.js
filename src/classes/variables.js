const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class Var {
    static client = null;

    static setClient(client) {
        Var.client = client;
    }

    constructor({ name, value, folder }) {
        this.name = name.replace(/\s+/g, '-');
        this.value = value;
        this.folder = folder;

        if (!fs.existsSync(this.folder)) {
            console.log(chalk.red(`✖ The folder "${this.folder}" does not exist.`));
        }

        this.filePath = path.join(this.folder, `${this.name}.var`);
        this.createVariable();
    }

    createVariable() {
        fs.writeFileSync(this.filePath, JSON.stringify({ default: this.value }), 'utf8');
    }

    static async isValidServer(serverId) {
        if (!Var.client.bot.guilds.cache.has(serverId)) {
            console.log(chalk.red(`✖ Server ID "${serverId}" is not valid.`));
            return false;
        }
        return true;
    }

    static async isValidUser(userId, serverId) {
        if (!(await Var.isValidServer(serverId))) return false;

        const guild = Var.client.bot.guilds.cache.get(serverId);
        const member = await guild.members.fetch(userId).catch(() => null);

        if (!member) {
            console.log(chalk.red(`✖ User ID "${userId}" is not valid in the server "${serverId}".`));
            return false;
        }
        return true;
    }

    static local = {
        set: async ({ name, value, user, server }) => {
            if (!Var.client || !Var.client.variableFolder) {
                throw new Error('Variable folder is not set. Ensure the "variable" option is configured correctly in the client.');
            }

            if (!(await Var.isValidUser(user, server))) return;

            const variableName = name.replace(/\s+/g, '-');
            const filePath = path.join(Var.client.variableFolder, `${variableName}.var`);

            if (!fs.existsSync(filePath)) {
                console.log(chalk.red(`✖ Variable "${name}" not found.`));
                return;
            }

            let data;
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                data = JSON.parse(fileContent);
            } catch (error) {
                data = { default: null };
            }

            if (!data[user]) {
                data[user] = {};
            }
            data[user][server] = value;
            fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
        },

        get: async ({ name, user, server }) => {
            if (!Var.client || !Var.client.variableFolder) {
                throw new Error('Variable folder is not set. Ensure the "variable" option is configured correctly in the client.');
            }

            if (!(await Var.isValidUser(user, server))) return null;

            const variableName = name.replace(/\s+/g, '-');
            const filePath = path.join(Var.client.variableFolder, `${variableName}.var`);

            if (!fs.existsSync(filePath)) {
                console.log(chalk.red(`✖ Variable "${name}" not found.`));
                return null;
            }

            let data;
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                data = JSON.parse(fileContent);
            } catch (error) {
                console.log(chalk.red(`✖ Variable "${name}" is not in JSON format.`));
                return null;
            }

            if (data[user] && data[user][server] !== undefined) {
                return data[user][server];
            }

            return data.default || null;
        }
    }

    static server = {
        set: async ({ name, value, server }) => {
            if (!Var.client || !Var.client.variableFolder) {
                throw new Error('Variable folder is not set. Ensure the "variable" option is configured correctly in the client.');
            }

            if (!(await Var.isValidServer(server))) return;

            const variableName = name.replace(/\s+/g, '-');
            const filePath = path.join(Var.client.variableFolder, `${variableName}.var`);

            if (!fs.existsSync(filePath)) {
                console.log(chalk.red(`✖ Variable "${name}" not found.`));
                return;
            }

            let data;
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                data = JSON.parse(fileContent);
            } catch (error) {
                data = { default: null };
            }

            data[server] = value;
            fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
        },

        get: async ({ name, server }) => {
            if (!Var.client || !Var.client.variableFolder) {
                throw new Error('Variable folder is not set. Ensure the "variable" option is configured correctly in the client.');
            }

            if (!(await Var.isValidServer(server))) return null;

            const variableName = name.replace(/\s+/g, '-');
            const filePath = path.join(Var.client.variableFolder, `${variableName}.var`);

            if (!fs.existsSync(filePath)) {
                console.log(chalk.red(`✖ Variable "${name}" not found.`));
                return null;
            }

            let data;
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                data = JSON.parse(fileContent);
            } catch (error) {
                console.log(chalk.red(`✖ Variable "${name}" is not in JSON format.`));
                return null;
            }

            return data[server] !== undefined ? data[server] : data.default || null;
        }
    }

    static global = {
        set: async ({ name, value, user }) => {
            if (!Var.client || !Var.client.variableFolder) {
                throw new Error('Variable folder is not set. Ensure the "variable" option is configured correctly in the client.');
            }

            if (user && !(await Var.isValidUser(user, Var.client.bot.guilds.cache.first().id))) return;

            const variableName = name.replace(/\s+/g, '-');
            const filePath = path.join(Var.client.variableFolder, `${variableName}.var`);

            if (!fs.existsSync(filePath)) {
                console.log(chalk.red(`✖ Variable "${name}" not found.`));
                return;
            }

            let data;
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                data = JSON.parse(fileContent);
            } catch (error) {
                data = { default: null };
            }

            if (user) {
                if (!data[user]) {
                    console.log(chalk.red(`✖ User "${user}" not found.`));
                    return;
                }
                data[user] = value;
            } else {
                data.default = value;
            }

            fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
        },

        get: async ({ name, user }) => {
            if (!Var.client || !Var.client.variableFolder) {
                throw new Error('Variable folder is not set. Ensure the "variable" option is configured correctly in the client.');
            }

            if (user && !(await Var.isValidUser(user, Var.client.bot.guilds.cache.first().id))) return null;

            const variableName = name.replace(/\s+/g, '-');
            const filePath = path.join(Var.client.variableFolder, `${variableName}.var`);

            if (!fs.existsSync(filePath)) {
                console.log(chalk.red(`✖ Variable "${name}" not found.`));
                return null;
            }

            let data;
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                data = JSON.parse(fileContent);
            } catch (error) {
                console.log(chalk.red(`✖ Variable "${name}" is not in JSON format.`));
                return null;
            }

            if (user) {
                return data[user] !== undefined ? data[user] : null;
            }

            return data.default || null;
        }
    }
}

module.exports = {
    Var
};