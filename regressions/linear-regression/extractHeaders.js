const fs = require('fs');
const _ = require('lodash');

module.exports = (filename) => {

  let data = fs.readFileSync(filename, { encoding: 'utf-8' });
  data = _.map(data.split('\n'), d => d.split(','));
  data = _.dropRightWhile(data, val => _.isEqual(val, ['']));
  const headers = _.first(data);
  headers.shift();
  headers.shift();
  headers.pop();
  return headers;
}
