const fs = require('fs');

module.exports = function(eleventyConfig) {
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