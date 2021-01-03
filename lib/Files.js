const replace = require('replace-in-file');
const path = require('path');
const fse = require('fs-extra');

class Files {
  static setTemplate = async (srcPath, destPath) => {
    if (!fse.pathExistsSync(srcPath))
      throw new Error(`Source path does not exist!`);
    if (fse.pathExistsSync(destPath))
      throw new Error(`The project ${path.basename(destPath)} already exists!`);
    try {
      await fse.copy(srcPath, destPath);
    } catch (err) {
      throw new Error(`Unable to copy the files in ${destPath}`);
    }
  };

  static replaceName = async (destPath, projectName) => {
    const files = [
      { name: 'README.md' },
      { name: 'client/package.json' },
      { name: 'client/package-lock.json' },
      { name: 'client/src/views/index.html' },
    ];
    const target = '--project-name--';
    try {
      await replace({
        files: files.map((file) => {
          return path.resolve(`${destPath}/${file.name}`);
        }),
        from: target,
        to: projectName.toLowerCase(),
      });
    } catch (error) {
      throw new Error(`Unable to set name "${projectName}"`);
    }
  };
}

module.exports = Files;
