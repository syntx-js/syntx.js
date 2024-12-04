const { ButtonBuilder, ActionRowBuilder } = require('discord.js');

class Buttons {
    constructor(buttons) {
        this.rows = [[]];

        buttons.forEach(button => {
            const newButton = new ButtonBuilder()
                .setLabel(button.label)
                .setStyle(button.style);

            if (button.style === "Link") {
                if (!button.url) {
                    throw new Error('URL is required for Link buttons');
                }
                newButton.setURL(button.url);
            } else {
                newButton.setCustomId(button.id);
            }

            if (button.disabled) {
                newButton.setDisabled(button.disabled);
            }

            if (button.emoji) {
                newButton.setEmoji(button.emoji);
            }

            if (button.row) {
                this.rows.push([newButton]);
            } else {
                this.rows[this.rows.length - 1].push(newButton);
            }
        });
    }

    build() {
        return this.rows.map(row => new ActionRowBuilder().addComponents(row));
    }
}

module.exports = Buttons;