const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

module.exports = {
    plugins: [
        postcssImport({
            // path: 'themes/test/assets/css'
            path: __dirname + '/assets/css'
        }),
        postcssPresetEnv(),
        cssnano({
            reduceIndents: false
        })        
    ]
};