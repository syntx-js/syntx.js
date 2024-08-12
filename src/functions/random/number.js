function number(a, b) {
    if (typeof(a) !== "number" || typeof(b) !== "number") {
        throw new Error('"a" and "b" must be numbers.');
    } else if (a >= b) {
        throw new Error('"a" must not be equal to or less than "b".');
    } else {
        return Math.floor(Math.random() * (b - a) + a);
    }
}

module.exports = number;