const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = async function editButton({ id, messageID, label, style, disabled, emoji }, message) {
    const msg = await message.channel.messages.fetch(messageID);
    if (!msg) throw new Error('Message not found');

    const row = msg.components.find(row => 
        row.components.some(button => button.customId === id)
    );
    if (!row) throw new Error('Button not found');

    const buttonIndex = row.components.findIndex(button => button.customId === id);
    if (buttonIndex === -1) throw new Error('Button not found');

    const oldButton = row.components[buttonIndex];

    // Recreate the button with the new properties
    const newButton = new ButtonBuilder()
        .setCustomId(oldButton.customId)
        .setLabel(label || oldButton.label)
        .setStyle(style || oldButton.style)
        .setDisabled(disabled !== undefined ? disabled : oldButton.disabled);

    if (emoji) {
        newButton.setEmoji(emoji);
    } else if (oldButton.emoji) {
        newButton.setEmoji(oldButton.emoji);
    }

    // Update the row with the new button
    row.components[buttonIndex] = newButton;

    // Update the message with the edited button
    const updatedRow = new ActionRowBuilder().addComponents(...row.components);
    await msg.edit({ components: [updatedRow] });
};