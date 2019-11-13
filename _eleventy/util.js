/**
 * Ensure a string starts with a '#' character
 * @param {String} id 
 */
function prependHash(id) {
    return id.startsWith('#') ? id : `#${id}`;
}

module.exports.prependHash = prependHash;