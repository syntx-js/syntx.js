const { EmbedBuilder } = require("discord.js");

/**
 * Clase para crear y configurar objetos Embed de Discord.
 */
class Embed {
    /**
     * Constructor de la clase Embed.
     * Inicializa un nuevo objeto EmbedBuilder y establece el tipo de estructura.
     */
    constructor() {
        this.embed = new EmbedBuilder();
        this.structureType = 1;
    }

    /**
     * Establece los datos y el tipo de estructura del Embed.
     * @param {Object} data - Los datos a configurar en el Embed.
     * @param {number} structureType - El tipo de estructura del Embed.
     */
    set(data, structureType = 1) {
        this.structureType = structureType;
        this.structureType === 1 ? this.setCommonFields(data) : this.setStructureTypeTwo(data);
    }

    /**
     * Establece los campos comunes del Embed.
     * @param {Object} data - Los datos a configurar en el Embed.
     */
    setCommonFields({ title, description, color, footer, footerIcon, image, thumbnail, author, authorIcon, authorURL }) {
        if (title) this.embed.setTitle(title);
        if (description) this.embed.setDescription(description);
        if (color) this.embed.setColor(color);
        if (footer) this.embed.setFooter({ text: footer, iconURL: footerIcon });
        if (image) this.embed.setImage(image);
        if (thumbnail) this.embed.setThumbnail(thumbnail);
        if (author) this.embed.setAuthor({ name: author, iconURL: authorIcon, url: authorURL });
    }

    /**
     * Establece los campos del Embed para el tipo de estructura 2.
     * @param {Object} data - Los datos a configurar en el Embed.
     */
    setStructureTypeTwo(data) {
        const { title, description, color, image, thumbnail, author, footer, fields, timestamp } = data;
        if (title) this.embed.setTitle(title.content).setURL(title.url);
        if (description) this.embed.setDescription(description);
        if (color) this.embed.setColor(color);
        if (image) this.embed.setImage(image);
        if (thumbnail) this.embed.setThumbnail(thumbnail);
        if (author) this.embed.setAuthor({ name: author.content, iconURL: author.icon, url: author.url });
        if (footer) this.embed.setFooter({ text: footer.content, iconURL: footer.icon });
        if (Array.isArray(fields)) {
            fields.forEach(({ name, value, inline }) => this.embed.addFields({ name, value, inline }));
        }
        if (timestamp) this.embed.setTimestamp(Date.now());
    }

    /**
     * Agrega un nuevo campo al Embed.
     * @param {string} name - El nombre del campo.
     * @param {string} value - El valor del campo.
     * @param {boolean} inline - Si el campo debe mostrarse en línea.
     */
    addField(name, value, inline = false) {
        if (this.structureType === 1) {
            this.embed.addFields({ name, value, inline });
        }
    }

    /**
     * Establece la URL del Embed.
     * @param {string} url - La URL a establecer.
     */
    setURL(url) {
        if (this.structureType === 1) {
            this.embed.setURL(url);
        }
    }

    /**
     * Establece la marca de tiempo del Embed.
     */
    timestamp() {
        if (this.structureType === 1) {
            this.embed.setTimestamp(Date.now());
        }
    }

    /**
     * Construye el Embed.
     * @returns {EmbedBuilder} - El Embed construido.
     */
    build() {
        return this.embed;
    }
}

module.exports = Embed;
