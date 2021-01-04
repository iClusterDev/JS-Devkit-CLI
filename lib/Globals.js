const path = require('path');

module.exports = {
  ROOT_PATH: () => path.resolve(__dirname, '../'),
  PLUGIN_PATH: () => path.resolve(__dirname, '../', 'plugin'),
  TEMPLATE_PATH: () => path.resolve(__dirname, '../', 'template'),
  PROJECT_PATH: (projectName) =>
    path.join(path.resolve(`${process.cwd()}`), projectName),
};
