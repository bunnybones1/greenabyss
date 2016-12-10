var version = require('./version.json');
console.log('green abyss client bundle version: ' + version.gitIdString);

var GameWorld = require('GameWorld');
var View = require('threejs-managed-view').View;
var googleApi = require('./googleApi')

googleApi.init({
	client_id: '1003887978766-ks5t12lss4gehrtbvcidpau0lj6vs0nf.apps.googleusercontent.com'
});

var view = new View();

require('utils/manageSceneOnEnterFrameObjects')(view.scene);
view.renderManager.onEnterFrame.add(view.scene.onEnterFrame);

var gameWorld = new GameWorld({
	scene: view.scene
});
