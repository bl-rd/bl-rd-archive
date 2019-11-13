const prependHash = require('../util').prependHash;

/**
 * Footnote to generate markdown for a link to a footer item
 * @param {String} content 
 * @param {String} id 
 * @param {String} target
 * @returns {String}
 */
function footnoteLink(content, id, target) {
    target = prependHash(target);
    return `[${content}](${target}|id=${id}|data-footnote|aria-describedby=footnote-description|aria-labelledby=yam-footnote)`;
}

module.exports = footnoteLink;