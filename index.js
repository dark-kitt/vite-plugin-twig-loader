// file system
const fs = require('fs');
const { extname } = require('path');
// render functions
const { retrieveOptions, configureTwig, renderTemplate } = require('./tasks');

/**
 * @param {import('.').Options} options
 * @returns {import('vite').Plugin}
 */
module.exports = (options) => {

  const {
    index = null,
    filters = {},
    functions = {},
    globals = {},
    settings = {}
  } = options || retrieveOptions();

  configureTwig({ filters, functions });

  return {
    name: 'vite-plugin-twig-loader',
    transformIndexHtml: {
      enforce: 'pre',
      async transform(html) {
        return index
          ? await renderTemplate(index, { ...globals }, settings)
          : html;
      }
    },
    async load(path) {
      if (extname(path) !== '.twig') return;
      const twig = await renderTemplate(path, { ...globals }, settings);
      const input = fs.readFileSync(path, 'utf8');

      return `
        export const path = ${JSON.stringify(path)};
        export const ctx = ${JSON.stringify(input)};
        export const globals = ${JSON.stringify({ ...globals })};
        export const settings = ${JSON.stringify(settings)};

        export default ${JSON.stringify(twig)};
      `;
    },
    handleHotUpdate({ file, server }) {
      if (extname(file) === '.twig') {
        server.ws.send({ type: 'full-reload' })
      }
    }
  };
};