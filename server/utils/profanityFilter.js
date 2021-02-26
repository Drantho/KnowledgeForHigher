
const badWords = require('bad-words');
const filter = new badWords();


module.exports = (text) => {
    return filter.isProfane(text);
};