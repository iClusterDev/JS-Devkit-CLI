const notify = require('./Notify');
const path = require('path');
const Git = require('./Git');
const Files = require('./Files');
const Terminal = require('./Terminal');

const srcDir = () => {
  const SRC_DIR = path.resolve(`${__dirname}`);
  return path.join(SRC_DIR, '../', 'template');
};

const destDir = (projectName) => {
  const DEST_DIR = path.resolve(`${process.cwd()}`);
  return path.join(DEST_DIR, projectName);
};

const create = async (projectName) => {
  try {
    const srcPath = srcDir();
    const destPath = destDir(projectName);
    Terminal.clear();
    Terminal.banner();

    notify.progress(`creating files`);
    await Files.setTemplate(srcPath, destPath);
    await Files.replaceName(destPath, projectName);
    notify.success(`project files created`);

    notify.progress(`installing dependencies`);
    await Terminal.chdir(path.join(destPath, 'client'));
    // console.log(
    //   "DEBUG ~ file: Create.js ~ line 32 ~ create ~ path.join(destPath, 'client')",
    //   path.join(destPath, 'client')
    // );
    // await Terminal.run('npm install');
    notify.success(`project dependencies installed`);

    notify.progress(`initializing git repository`);
    await Git.gitignore();
    await Git.init();
    notify.success(`repo successfully initialized\n`);

    Terminal.clear();
    Terminal.banner();
  } catch (error) {
    notify.failure(error.message);
    process.exit();
  }
};

module.exports = create;
