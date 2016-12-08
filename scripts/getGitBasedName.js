var git = require('git-rev')

var interestedIn = [
	'branch',
	'short'
];

function collecterCallback(key, str) {
	this.waitingFor--;
	this.collected[key] = str;
	if(this.waitingFor === 0) {
		finish.call(this);
	}
}

function finish() {
	var collected = this.collected;
	var name = interestedIn.map(function(key) {
		return collected[key];
	}).join('.');
	this.callback(name);
}

function getGitBasedName(callback) {
	if(!callback) {
		throw new Error('Please pass a callback.');
	}
	var temp = {
		collected: {},
		waitingFor: interestedIn.length,
		callback: callback
	};

	interestedIn.forEach(function(key) {
		git[key](collecterCallback.bind(temp, key));
	});

	return "asyncronous method. Pass callback.";
}


module.exports = getGitBasedName;