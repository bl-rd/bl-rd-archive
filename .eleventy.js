const fs = require("fs");

module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {
        const content_404 = fs.readFileSync('_site/404/index.html');

        bs.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });
};