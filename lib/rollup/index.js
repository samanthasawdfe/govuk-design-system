const { normalize, resolve } = require('path')

const { rollup } = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const { minify } = require('terser')

/**
 * Metalsmith Rollup plugin
 *
 * @param {import('rollup').InputOptions['input']} modulePath - File path to module
 * @param {import('rollup').OutputOptions['name']} moduleName - Module name (optional)
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */
const plugin = (modulePath, moduleName) => async (files, metalsmith, done) => {
  modulePath = normalize(modulePath)

  try {
    // Create Rollup bundle
    const bundle = await rollup({
      input: resolve(metalsmith.source(), modulePath),
      plugins: [
        nodeResolve(),
        commonjs()
      ]
    })

    // Compile Rollup bundle
    const result = await bundle.generate({
      sourcemapFile: modulePath,
      sourcemap: true,

      // Self-executing function, suitable for <script> tags
      format: 'iife',

      // Legacy mode is required for IE8 support
      legacy: true,

      // Used to set the `window` global for 'iife' and 'umd' bundles
      name: moduleName
    })

    // Minify Rollup bundle
    const minified = await minify({ [modulePath]: result.code }, {
      format: { comments: false },

      // Include source maps
      sourceMap: {
        content: result.map,
        filename: result.map.file,
        url: `${result.map.file}.map`,
        includeSources: true
      },

      // Compatibility workarounds
      ecma: 5,
      ie8: true,
      safari10: true
    })

    const file = modulePath
    const map = `${file}.map`

    // Update Metalsmith file contents
    files[file] = {
      contents: Buffer.from(minified.code)
    }

    // Add Metalsmith source map file
    files[map] = {
      contents: Buffer.from(minified.map)
    }

    done()
  } catch (error) {
    done(error)
  }
}

module.exports = plugin
