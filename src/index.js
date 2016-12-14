var version = require('./version.json');
console.log('green abyss client bundle version: ' + version.gitIdString);

window.THREE = require('three');

require('three/examples/js/controls/VRControls');
require('three/examples/js/effects/VREffect');
require('vendor/SkyShader');

var GameWorld = require('GameWorld');
var googleApi = require('./googleApi')

googleApi.init({
	client_id: '1003887978766-ks5t12lss4gehrtbvcidpau0lj6vs0nf.apps.googleusercontent.com'
});


var manageSceneOnEnterFrameObjects = require('utils/manageSceneOnEnterFrameObjects');
var setupRayInput = require('utils/setupRayInput');

var view;
var renderer;
var vrDisplay;
var gameWorld;
function onLoad() {
	view = setupRayInput();
	renderer = view.renderer;

	manageSceneOnEnterFrameObjects(view.scene);
	gameWorld = new GameWorld({
		scene: view.scene,
		renderer: renderer
	});

	window.addEventListener('resize', view.resize.bind(renderer));

	navigator.getVRDisplays().then(function(displays) {
		if (displays.length > 0) {
			vrDisplay = displays[0];
			vrDisplay.requestAnimationFrame(render);
		}
	});
}

function render() {
	view.scene.onEnterFrame();
	gameWorld.onEnterFrame();
	view.render();
	vrDisplay.requestAnimationFrame(render);
}

window.addEventListener('load', onLoad);
