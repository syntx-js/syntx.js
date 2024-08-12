const { EmbedBuilder } = require("discord.js");

class Embed {
    constructor() {
        this.embed = new EmbedBuilder();
    }

    set({ title, description, color, footer, footerIcon, image, thumbnail, author, authorIcon, authorURL }) {
        if (title) this.embed.setTitle(title);
        if (description) this.embed.setDescription(description);
        if (color) this.embed.setColor(color);
        if (footer) this.embed.setFooter({ text: footer, iconURL: footerIcon });
        if (image) this.embed.setImage(image);
        if (thumbnail) this.embed.setThumbnail(thumbnail);
        if (author) this.embed.setAuthor({ name: author, iconURL: authorIcon, url: authorURL });
    }

    timestamp() {
        this.embed.setTimestamp(Date.now())
    }

    addField(name, value, inline = false) {
        this.embed.addFields({ name, value, inline });
    }

    setURL(url) {
        this.embed.setURL(url);
    }

    build() {
        return this.embed;
    }
}

module.exports = Embed;