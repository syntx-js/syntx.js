const { ActionRowBuilder, StringSelectMenuBuilder, ChannelSelectMenuBuilder, UserSelectMenuBuilder } = require('discord.js');

class SelectMenus {
    constructor(menus = []) {
        this.menus = menus.map(menu => this.createMenu(menu));
    }

    createMenu(menu) {
        const {
            type = 'normal',
            menu_id,
            content = null,
            max = 1,
            min = 1,
            fields = []
        } = menu;

        if (!menu_id) {
            throw new Error('menu_id is required');
        }

        let selectMenu;

        switch (type) {
            case 'user':
                selectMenu = new UserSelectMenuBuilder()
                    .setCustomId(menu_id)
                    .setMinValues(min)
                    .setMaxValues(max);
                break;

            case 'channel':
                selectMenu = new ChannelSelectMenuBuilder()
                    .setCustomId(menu_id)
                    .setMinValues(min)
                    .setMaxValues(max);
                break;

            case 'normal':
            default:
                selectMenu = new StringSelectMenuBuilder()
                    .setCustomId(menu_id)
                    .setMinValues(min)
                    .setMaxValues(max)
                    .addOptions(fields.map(field => this.createField(field)));
                break;
        }

        if (content) {
            selectMenu.setPlaceholder(content);
        }

        const actionRow = new ActionRowBuilder().addComponents(selectMenu);
        return actionRow;
    }

    createField(field) {
        const {
            name,
            value,
            description = null,
            default: isDefault = false,
            emoji = null
        } = field;

        if (!name || !value) {
            throw new Error('name and value are required for each field');
        }

        const option = {
            label: name,
            value: value,
            default: isDefault
        };

        if (description) {
            option.description = description;
        }

        if (emoji) {
            option.emoji = emoji;
        }

        return option;
    }

    build() {
        return this.menus;
    }
}

module.exports = SelectMenus;