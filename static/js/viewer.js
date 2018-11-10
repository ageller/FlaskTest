function setParams(vars){
	var keys = Object.keys(vars);
	keys.forEach(function(k){
		externalParams[k] = parseFloat(vars[k])
	});
	drawSphere()
}
//https://blog.miguelgrinberg.com/post/easy-websockets-with-flask-and-gevent
//https://github.com/miguelgrinberg/Flask-SocketIO
function connectSocketInput(){
	//$(document).ready(function() {
	document.addEventListener("DOMContentLoaded", function(event) { 
		// Event handler for new connections.
		// The callback function is invoked when a connection with the
		// server is established.
		internalParams.socket.on('connect', function() {
			internalParams.socket.emit('connection_test', {data: 'I\'m connected!'});
		});
		internalParams.socket.on('connection_response', function(msg) {
			console.log(msg);
		});
		// Event handler for server sent data.
		// The callback function is invoked whenever the server emits data
		// to the client. The data is then displayed in the "Received"
		// section of the page.
		internalParams.socket.on('update_params', function(msg) {
			setParams(msg);
		});
		internalParams.socket.on('update_camera', function(msg) {
			internalParams.camera.position.x = msg.position.x;
			internalParams.camera.position.y = msg.position.y;
			internalParams.camera.position.z = msg.position.z;

			internalParams.camera.rotation.x = msg.rotation.x;
			internalParams.camera.rotation.y = msg.rotation.y;
			internalParams.camera.rotation.z = msg.rotation.z;

			internalParams.camera.up.x = msg.up.x;
			internalParams.camera.up.y = msg.up.y;
			internalParams.camera.up.z = msg.up.z;
		});
		internalParams.socket.on('update_controls', function(msg) {
			internalParams.controls.target.x = msg.target.x;
			internalParams.controls.target.y = msg.target.y;
			internalParams.controls.target.z = msg.target.z;

		});
	});
}
function drawSphere(){
	//sphere geometry
	if (internalParams.sphere != null){
		internalParams.scene.remove(internalParams.sphere);
	}
	var geometry = new THREE.SphereGeometry(externalParams.radius, externalParams.widthSegments, externalParams.heightSegments, externalParams.phiStart, externalParams.phiLength, externalParams.thetaStart, externalParams.thetaLength)
	internalParams.sphere = new THREE.Mesh( geometry, internalParams.material );
	internalParams.scene.add( internalParams.sphere );
};


//this will draw the scene (with lighting)
function drawViewer(){

	//draw the sphere
	internalParams.material = new THREE.MeshPhongMaterial( { color: 0x156289, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );
	drawSphere();

	//lights
	var lights = [];
	lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	// lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	// lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

	lights[ 0 ].position.set( 0, 200, 0 );
	// lights[ 1 ].position.set( 100, 200, 100 );
	// lights[ 2 ].position.set( - 100, - 200, - 100 );

	lights.forEach(function(element){
		internalParams.scene.add(element);
	})


}


//this is the animation loop
function animateViewer(time) {
	requestAnimationFrame( animateViewer );
	internalParams.controls.update();
	internalParams.renderer.render( internalParams.scene, internalParams.camera );
}

//this is called to start everything
function startViewer(){

//define the params objects
	defineInternalParams();
	defineExternalParams();

//initialize everything related to the WebGL scene
	initScene();

//create the UI
	//createGUI();

//draw everything
	drawViewer();

//begin the animation
	animateViewer();
}





