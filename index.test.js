const create = require('./lib/Create');
console.log('starting test!');
// test for lib folder exists
// test for template folder exists
if (!create) {
  throw new Error('unable to get create from ./lib');
} else {
  console.log('all good!');
}
