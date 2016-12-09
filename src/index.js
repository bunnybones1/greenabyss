var express = require('express');
var path = require('path');
var app = express();
var deployedClientBundles = require('./deployedClientBundles.json');

app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var bundlePath = 'https://s3.amazonaws.com/greenabyss/';
if(process.env.LOCAL_CLIENT_BUNDLES) {
	bundlePath = '';
	var clientPath = path.resolve(__dirname + '/../../client/app/client');
	console.log('Serving bundles from: ' + clientPath);
	app.use(express.static(clientPath));
}


app.get('/', function(request, response) {
	var bundleUrl = bundlePath + deployedClientBundles.list[~~(deployedClientBundles.list.length * Math.random())].file;
	response.render('pages/index', {bundleUrl:bundleUrl});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
