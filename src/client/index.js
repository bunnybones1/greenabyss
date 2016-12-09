var version = require('./version.json');
console.log('green abyss testA' + version.gitIdString);

var googleApi = require('./googleApi').init();