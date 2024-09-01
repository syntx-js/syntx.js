const fs = require('fs');
const path = require('path');

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
            throw new Error(`The folder "${this.folder}" does not exist.`);
        }

        this.filePath = path.join(this.folder, `${this.name}.var`);
        this.createVariable();
    }

    createVariable() {
        fs.writeFileSync(this.filePath, JSON.stringify({ default: this.value }), 'utf8');
    }

    static async isValidServer(serverId) {
        if (!Var.client.bot.guilds.cache.has(serverId)) {
            throw new Error(`Server ID "${serverId}" is not valid.`);
        }
        return true;
    }

    static async isValidUser(userId, serverId) {
        if (!(await Var.isValidServer(serverId))) return false;

        const guild = Var.client.bot.guilds.cache.get(serverId);
        const member = await guild.members.fetch(userId).catch(() => null);

        if (!member || !member.user || member.user.bot || member.user.system) {
            throw new Error(`User ID "${userId}" is a bot or webhook in server "${serverId}", skipping.`);
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
                throw new Error(`Variable "${name}" not found.`);
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
                throw new Error(`Variable "${name}" not found.`);
            }

            let data;
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                data = JSON.parse(fileContent);
            } catch (error) {
                throw new Error(`Variable "${name}" is not in JSON format.`);
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
                throw new Error(`Variable "${name}" not found.`);
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
                throw new Error(`Variable "${name}" not found.`);
            }

            let data;
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                data = JSON.parse(fileContent);
            } catch (error) {
                throw new Error(`Variable "${name}" is not in JSON format.`);
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
                throw new Error(`Variable "${name}" not found.`);
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
                    throw new Error(`User "${user}" not found.`);
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
                throw new Error(`Variable "${name}" not found.`);
            }

            let data;
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                data = JSON.parse(fileContent);
            } catch (error) {
                throw new Error(`Variable "${name}" is not in JSON format.`);
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