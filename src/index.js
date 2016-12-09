var version = require('./version.json');
console.log('green abyss client bundle version: ' + version.gitIdString);

var googleApi = require('./googleApi')

googleApi.init({
	client_id: '1003887978766-ks5t12lss4gehrtbvcidpau0lj6vs0nf.apps.googleusercontent.com'
});