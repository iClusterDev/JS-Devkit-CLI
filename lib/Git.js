const git = require('simple-git')();
const path = require('path');

class Git {
  static init = async () => {
    try {
      // console.log('initializing git repo');
      // await git.init();
      // await git.add('./*');
      // await git.commit('first commit');
      // console.log('repo initialized');
      const currentDir = path.resolve(`${process.cwd()}`);
      console.log(currentDir);
    } catch (error) {
      throw new Error('Error.git: unable to initalize a git repository');
    }
  };
}

module.exports = Git;
