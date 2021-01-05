const path = require('path');
const root = path.resolve(__dirname, '../');

module.exports = {
  ROOT_PATH: () => root,
  TEMPLATE_PATH: () => path.join(root, 'template'),
  TEMPLATE_CLIENT_PATH: () => path.join(root, 'template/client'),
  PLUGIN_PATH: () => path.join(root, 'plugin'),
  PROJECT_PATH: (projectName) =>
    path.join(path.resolve(`${process.cwd()}`), projectName),
};
