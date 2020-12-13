const fs = require('fs');
const git = require('simple-git')();
const util = require('util');
const path = require('path');

const writeFile = util.promisify(fs.writeFile);

class Git {
  static gitignore = async () => {
    const gitignoreContent = 'node_modules\ndist\n.cache\ndevelopment';
    try {
      await writeFile('.gitignore', gitignoreContent);
    } catch (error) {
      throw new Error('Error.Git: unable to create .gitignore file');
    }
  };

  static init = async () => {
    git.cwd(path.resolve(`${process.cwd()}`));
    try {
      await git.init();
    } catch (error) {
      throw new Error('Error.Git: unable to initalize a git repository!');
    }
  };
}

module.exports = Git;
