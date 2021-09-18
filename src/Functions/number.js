module.exports = {
    isFloat: (n) => {
        return Number(n) === n && n % 1 !== 0;
    },
    isInt: (n) => {
        return Number(n) === n && n % 1 === 0;
    }
}