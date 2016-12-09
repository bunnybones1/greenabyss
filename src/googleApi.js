var loadandrunscripts = require('loadandrunscripts');

var authData = {
	client_id: '1003887978766-ks5t12lss4gehrtbvcidpau0lj6vs0nf.apps.googleusercontent.com',
	scope: 'https://www.googleapis.com/auth/games',
	immediate: true,
	cookie_policy: 'single_host_origin'
};

function init() {
	loadandrunscripts(
		[
			'https://apis.google.com/js/client.js?onload=onGapiLoadCallback'
		],
		onGapiReady
	);
}

function onGapiReady() {
	window.attemptLogin = attemptLogin;
	window.attemptLogout = attemptLogout;
}

function onGapiLoadCallback(){
	console.log('Gapi ready!!');
	attemptLogin();
}

function attemptLogin(){
	console.log('Attempting login!!');
	gapi.auth.authorize(authData, function(response) {
		if (response.status.signed_in) {
			console.log('Logged in!');
		} else {
			authData.immediate = false;
			gapi.auth.authorize(authData, function(response) {
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