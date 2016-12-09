var loadandrunscripts = require('loadandrunscripts');
var defaults = require('lodash.defaults');

var __defaultParams = {
	client_id: 'pleaseprovide.apps.googleusercontent.com',
	scope: 'https://www.googleapis.com/auth/games',
	immediate: true,
	cookie_policy: 'single_host_origin'
};

var _apiParams;
function init(params) {
	_apiParams = defaults(params, __defaultParams);
	loadandrunscripts(
		[
			'https://apis.google.com/js/client.js?onload=onGapiLoadCallback'
		],
		onGapiLoaded
	);
}

function onGapiLoaded() {
	console.log('gapi js loaded.');
	window.attemptLogin = attemptLogin;
	window.attemptLogout = attemptLogout;
}

function onGapiLoadCallback(){
	console.log('Gapi ready!!');
	attemptLogin();
}
window.onGapiLoadCallback = onGapiLoadCallback;

function attemptLogin(){
	console.log('Attempting login!!');
	gapi.auth.authorize(_apiParams, function(response) {
		if (response.status.signed_in) {
			console.log('Logged in!');
		} else {
			_apiParams.immediate = false;
			gapi.auth.authorize(_apiParams, function(response) {
				debugger;
			});
		}
	});
}

function attemptLogout(){
	console.log('Attempting logout!!');
	gapi.auth.signOut();
}

module.exports = {
	init: init
};