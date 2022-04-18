// file system
const { stat } = require('fs');
const process = require('process');
const { resolve } = require('path');
// modules
const Twig = require('twig');

/**
 * Retrieves options from the configuration file
 * @returns {object}
 */
 function retrieveOptions() {
  const cwd = process.cwd();
  const file = resolve(cwd, 'twig.config.js');

  stat(file, function(err, stat) {
    if (err && err.code === 'ENOENT') return false;

    if (err === null) {
        try {
          return require(file);
        } catch (e) {
          console.error(`Require ${file} faild:\n`, e);
        }
    } else {
        console.error('File system error: ', err.code);
    }
  });

  return {};
}

/**
 * It handles Twig configuration and extension
 * @param {object} extensions
 */
function configureTwig({ functions = {}, filters = {} } = {}) {
  Twig.cache(false);
  Object.entries(filters).forEach(([key, fn]) => Twig.extendFilter(key, fn));
  Object.entries(functions).forEach(([key, fn]) => Twig.extendFunction(key, fn));
}

/**
 * It handles the conversion from twig to html
 * @param {string} template The twig template filepath
 * @param {object} context The data to be injected in the template
 * @param {object} settings The twig settings
 * @returns {Promise}
 */
function renderTemplate(template, context = {}, settings = {}) {
  return new Promise((resolve, reject) => {
    Twig.renderFile(template, { ...context, settings }, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
}

module.exports.retrieveOptions = retrieveOptions;
module.exports.configureTwig = configureTwig;
module.exports.renderTemplate = renderTemplate;