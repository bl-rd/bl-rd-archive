/**
 * 
 * @param {String} id 
 */
function footnoteBack(id) {
    id = id.startsWith('#')
        ? id
        : `#${id}`;

    return `<a href="${id}">Back</a>`;
}

module.exports = footnoteBack;