const notify = require('./Notify');
const path = require('path');
const Git = require('./Git');
const Files = require('./Files');
const Config = require('./Config');
const Globals = require('./Globals');
const Terminal = require('./Terminal');

const installClient = async (templatePath, projectPath, projectName) => {
  const files = [
    { name: 'README.md' },
    { name: 'client/package.json' },
    { name: 'client/package-lock.json' },
    { name: 'client/src/views/index.html' },
  ];
  notify.progress(`creating files`);
  await Files.setTemplate(templatePath, projectPath);
  await Files.replaceName(projectPath, projectName, files);
  notify.success(`project files created`);

  notify.progress(`installing dependencies`);
  await Terminal.chdir(Globals.TEMPLATE_CLIENT_PATH());
  // await Terminal.run('npm install');
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
  // await Terminal.run('npm install');
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
    Terminal.reset();
    const templatePath = Globals.TEMPLATE_PATH();
    const projectPath = Globals.PROJECT_PATH(projectName);
    const projectConfig = await Config.setup(projectName);
    await installClient(templatePath, projectPath, projectName);
    if (projectConfig.serverPlugin)
      await installServer(projectPath, projectConfig.serverType, projectName);
    await finalize(projectPath);
    Terminal.reset();
  } catch (error) {
    notify.failure(error.message);
    process.exit();
  }
};

module.exports = create;
