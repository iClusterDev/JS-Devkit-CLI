const notify = require('./Notify');
const path = require('path');
const Git = require('./Git');
const Files = require('./Files');
const Config = require('./Config');
const Terminal = require('./Terminal');

const srcDir = () => {
  const SRC_DIR = path.resolve(`${__dirname}`);
  return path.join(SRC_DIR, '../', 'template');
};

const rootDir = (projectName) => {
  const ROOT_DIR = path.resolve(`${process.cwd()}`);
  return path.join(ROOT_DIR, projectName);
};

const installClient = async (srcPath, rootPath, projectName) => {
  const files = [
    { name: 'README.md' },
    { name: 'client/package.json' },
    { name: 'client/package-lock.json' },
    { name: 'client/src/views/index.html' },
  ];
  notify.progress(`creating files`);
  await Files.setTemplate(srcPath, rootPath);
  await Files.replaceName(rootPath, projectName, files);
  notify.success(`project files created`);

  notify.progress(`installing dependencies`);
  await Terminal.chdir(path.join(rootPath, 'client'));
  await Terminal.run('npm install');
  notify.success(`project dependencies installed`);
};

const installServer = async (rootPath, serverType, projectName) => {
  const srcPath = path.join(
    path.resolve(`${__dirname}`),
    '../',
    'plugin',
    serverType
  );
  notify.progress(`installing server files`);
  await Files.setTemplate(srcPath, rootPath);
  await Files.replaceName(rootPath, projectName, [{ name: 'package.json' }]);
  notify.success(`server files installed`);

  notify.progress(`installing server dependencies`);
  await Terminal.chdir(rootPath);
  await Terminal.run('npm install');
  notify.success(`server dependencies installed`);
};

const finalize = async (rootPath) => {
  notify.progress(`initializing git repository`);
  await Terminal.chdir(path.join(rootPath));
  await Git.gitignore();
  await Git.init();
  notify.success(`repo successfully initialized\n`);
};

const create = async (projectName) => {
  try {
    const srcPath = srcDir();
    const rootPath = rootDir(projectName);
    const config = await Config.setup(projectName);
    Terminal.reset();
    await installClient(srcPath, rootPath, projectName);
    if (config.serverPlugin)
      await installServer(rootPath, config.serverType, projectName);
    await finalize(rootPath);
    Terminal.reset();
  } catch (error) {
    notify.failure(error.message);
    process.exit();
  }
};

module.exports = create;
