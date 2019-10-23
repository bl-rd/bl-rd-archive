const fs = require('fs');
const filters = require('./_eleventy/filters');
const { passthrough } = require('./_eleventy/options');

module.exports = function(eleventyConfig) {

  // add filters
  Object.keys(filters).forEach(f => {
    eleventyConfig.addFilter(f, filters[f]);
  });

  // pass through types
  passthrough.forEach(p => eleventyConfig.addPassthroughCopy(p));

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