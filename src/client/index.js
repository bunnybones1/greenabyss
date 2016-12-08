var version = require('./version.json');
var loadandrunscripts = require('loadandrunscripts');

console.log('green abyss testA' + version.gitIdString);

var metatagData = {
	"google-signin-client_id": "1003887978766-ks5t12lss4gehrtbvcidpau0lj6vs0nf.apps.googleusercontent.com",
	"google-signin-cookiepolicy": "single_host_origin",
	"google-signin-callback": "onSignIn",
	"google-signin-scope": "https://www.googleapis.com/auth/games",
}

loadandrunscripts([
	'https://apis.google.com/js/client.js'
	],
	onGapiReady
);

function onGapiReady() {
	console.log('GAPI ready');
}

window.onSignIn = function() {
	console.log('SIGN IN!');
}