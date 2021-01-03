const { prompt } = require('inquirer');

class Config {
  static setup = (projectName) => {
    const questions = [
      {
        type: 'confirm',
        name: 'serverPlugin',
        message: `Will you use a server for ${projectName}?`,
      },
      {
        type: 'list',
        name: 'serverType',
        message: `What type of server are you going to use?`,
        choices: ['express', 'graphql'],
        filter: function (val) {
          return val.toLowerCase();
        },
      },
    ];
    return prompt(questions);
  };
}

module.exports = Config;
