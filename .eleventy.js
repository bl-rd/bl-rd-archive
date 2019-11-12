const fs = require('fs');
const filters = require('./_eleventy/filters');
const blogFooter = require('./_eleventy/shortcodes/blogFooter');
const footnoteBack = require('./_eleventy/shortcodes/footnoteBack');
const { passthrough } = require('./_eleventy/options');
const markdownIt = require('markdown-it');
const mila = require('markdown-it-link-attributes');

module.exports = function(eleventyConfig) {

  // add filters
  Object.keys(filters).forEach(f => {
    eleventyConfig.addFilter(f, filters[f]);
  });

  // shortcodes
  eleventyConfig.addPairedShortcode('blogFooter', blogFooter);
  eleventyConfig.addShortcode('footnoteBack', footnoteBack);

  // pass through types
  passthrough.forEach(p => eleventyConfig.addPassthroughCopy(p));

  // Layouts
  eleventyConfig.addLayoutAlias('standard', 'layouts/standardLayout.njk');
  eleventyConfig.addLayoutAlias('article', 'layouts/article.njk');

  // Markdown config
  const options = {
    html: true,
    breaks: true,
    linkify: true
  };
  
  eleventyConfig.setLibrary("md", 
    markdownIt(options)
        .use(mila, [{
            pattern: /^https:/,
            attrs: {
                rel: 'noreferrer noopener',
                target: '_blank'
            }
        }, {
            pattern: /^\//,
            attrs: {
                rel: 'me'
            }
        }])
    );


  // Allow 404 when testing locally
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: async function(err, bs) {
        const notFoundTemplate = fs.readFileSync('_site/404/index.html');

        bs.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(notFoundTemplate);
          res.end();
        });
      }
    }
  });
};