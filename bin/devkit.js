#!/usr/bin/env node

const create = require('../lib/Create');
const notify = require('../lib/Notify');
const program = require('commander');

program.version('1.1.5').description('DevKit CLI');

program
  .command('create <projectName>')
  .description('create project')
  .action(async (projectName) => {
    try {
      await create(projectName);
      notify.info(`good to go!`);
    } catch (error) {
      notify.failure(error.message);
    }
  });

program.parse(process.argv);
