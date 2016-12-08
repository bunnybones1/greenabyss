var crypto = require('crypto');
var exec = require('child_process').exec;
var getGitBasedName = require('./getGitBasedName');
var jsonfile = require('jsonfile');
var fs = require('fs');


var __clientBundleListFilePath = './src/server/deployedClientBundles.json';
var __clientBundleList;
getCurrentBuildsList(verifyClientBundlesListAndBuild);

function getCurrentBuildsList(callback) {
	jsonfile.readFile(__clientBundleListFilePath, callback);
}

function verifyClientBundlesListAndBuild(err, clientBundleList) {
	if(err) {
		if(err.message.indexOf('no such file') !== -1) {
			console.log('No clientbundles.json. Creating soon...');
			clientBundleList = {list:[]};
		} else {
			throw err;
		}
	}
	console.log('--Currently deployed builds--');
	clientBundleList.list.forEach(function(item, i) {
		console.log(i + ': ' + item.file);
	});
	console.log('----');
	__clientBundleList = clientBundleList;
	getGitBasedName(startUniqueBuild);
}


function startUniqueBuild(gitIdString) {
	console.log('git build id: ' + gitIdString);
	jsonfile.writeFile('./src/client/version.json', {gitIdString: gitIdString}, buildBundle.bind(null, gitIdString));
}

function buildBundle(gitIdString, err) {
	if(err) {
		throw err;
	}
	var bundleFileName = 'bundle.' + gitIdString + '.js';
	var bundleFilePath = 'app/client/' + bundleFileName;
	var cmd = 'browserify src/client/index.js -o ' + bundleFilePath;
	exec(cmd, function(error, stdout, stderr) {
		if(error) {
			throw error;
		}

		// the file you want to get the hash    
		var fd = fs.createReadStream(bundleFilePath);
		var hash = crypto.createHash('sha1');
		hash.setEncoding('hex');

		fd.on('end', hashRenameAndSaveBuild.bind(null, hash, bundleFileName, bundleFilePath));
		fd.pipe(hash);
	});
}

function hashRenameAndSaveBuild(hash, bundleFileName, bundleFilePath) {
	hash.end();
	var fileHash = hash.read();
	console.log('file hash: ' + fileHash); // the desired sha1sum
	var newBundleFileName = bundleFileName.replace('.js', '.' + fileHash + '.js');
	var newBundleFilePath = bundleFilePath.replace('.js', '.' + fileHash + '.js');

	function alreadyExists(item) {
		return item.file === newBundleFileName;
	}

	if(!__clientBundleList.list.some(alreadyExists)) {
		__clientBundleList.list.push({
			weight: 1,
			file: newBundleFileName
		});
		fs.rename(bundleFilePath, newBundleFilePath, function(err) {
			if(err) {
				throw err;
			}
			saveClientBundleList(finish);
		})
	} else {
		console.error('WARNING: ' + newBundleFileName + ' already exists! Doing nothing.');
	}
}

function saveClientBundleList(callback) {
	jsonfile.writeFile(__clientBundleListFilePath, __clientBundleList, {spaces: 2}, function(err) {
		if(err) {
			throw err;
		}
		callback();
	});
}

function finish() {
	console.log('DONE!');
}