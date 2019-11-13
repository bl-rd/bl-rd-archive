const prependHash = require('../util').prependHash;

/**
 * Link from a footer item back to the original content
 * @param {String} id 
 * @returns {String}
 */
function footnoteBack(id) {
    return `<a href="${prependHash(id)}">Back</a>`;
}

module.exports = footnoteBack;