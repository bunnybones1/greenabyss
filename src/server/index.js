var express = require('express');
var app = express();
var deployedClientBundles = require('./deployedClientBundles.json');

app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	var bundleUrl = 'https://s3.amazonaws.com/greenabyss/' + deployedClientBundles.list[~~(deployedClientBundles.list.length * Math.random())].file;
	response.render('pages/index', {bundleUrl:bundleUrl});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
