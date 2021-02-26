const esbuild = require('esbuild');

// esbuild _src/assets/js/builds/default.js --bundle --minify --outfile=_src/assets/js/dist/default.js

const buildPath = '_src/assets/js/builds';
const outputPath = '_src/assets/js/dist';
const entryPoints = [
  'default.js',
  'post.js'
];

buildScripts(entryPoints.map(x => `${buildPath}/${x}`), outputPath);

/**
 * Bundle all the things
 * @param {String[]} files The list of file names to be bundled
 * @param {String} outputPath The dest directory
 */
async function buildScripts(files, outputPath) {
  // let queue = [];
  // for (let i = 0; i < files.length; ++) {
  //   queue.push(build(files[i], outputPath))
  // }
  const queue = files.map(x => build(x, outputPath));

  try {
    await Promise.all(queue);
    console.log('=> Successfully bundled javascript files');
  } catch (e) {
    console.error(e);
    return process.exit(1);
  }
}

/**
 * Bundle a single file
 * @param {String} file The full filepath of the file to build
 * @param {String} output The dest directory
 */
async function build(file, outDir) {
  await esbuild.build({
    entryPoints: [ file ],
    bundle: true,
    minify: true,
    outdir: outDir
  });
}