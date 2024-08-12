function text(texts) {
    if (!Array.isArray(texts)) {
        throw new Error('"texts" must be an array.');
    } else {
        const result = Math.floor(Math.random() * texts.length);
        return texts[result];
    }
}

module.exports = text;