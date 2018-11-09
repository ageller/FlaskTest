//all "global" variables are contained within params object
var externalParams;
function defineExternalParams(){
	externalParams = new function() {

		//for sphere
		this.radius = 5.;
		this.widthSegments = 32;
		this.heightSegments = 32;
		this.phiStart = 0;
		this.phiLength = 2.*Math.PI;
		this.thetaStart = 0;
		this.thetaLength = Math.PI;


	};


}

var internalParams;
function defineInternalParams(){
	internalParams = new function() {

		this.container = null;
		this.renderer = null;
		this.scene = null;

		//for frustum      
		this.zmax = 5.e10;
		this.zmin = 1;
		this.fov = 45.

		//for gui
		this.gui = null;

		//for sphere
		this.sphere;
		this.material = null;

	};
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

//this initializes everything needed for the scene
function init(){

	var screenWidth = window.innerWidth;
	var screenHeight = window.innerHeight;
	var aspect = screenWidth / screenHeight;

	// renderer
	internalParams.renderer = new THREE.WebGLRenderer( {
		antialias:true,
	} );
	internalParams.renderer.setSize(screenWidth, screenHeight);

	internalParams.container = document.getElementById('WebGLContainer');
	internalParams.container.appendChild( internalParams.renderer.domElement );

	// scene
	internalParams.scene = new THREE.Scene();     

	// camera
	internalParams.camera = new THREE.PerspectiveCamera( internalParams.fov, aspect, internalParams.zmin, internalParams.zmax);
	internalParams.camera.up.set(0, -1, 0);
	internalParams.camera.position.z = 30;
	internalParams.scene.add(internalParams.camera);  

	// events
	THREEx.WindowResize(internalParams.renderer, internalParams.camera);

	//controls
	internalParams.controls = new THREE.TrackballControls( internalParams.camera, internalParams.renderer.domElement );


}


//this will draw the scene (with lighting)
function drawScene(){

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
function setParams(vars){
	var keys = Object.keys(vars);
	keys.forEach(function(k){
		externalParams[k] = parseFloat(vars[k])
	});
	drawSphere()
}

//https://blog.miguelgrinberg.com/post/easy-websockets-with-flask-and-gevent
//https://github.com/miguelgrinberg/Flask-SocketIO
function connectSocket(){
	$(document).ready(function() {
		// Use a "/test" namespace.
		// An application can open a connection on multiple namespaces, and
		// Socket.IO will multiplex all those connections on a single
		// physical channel. If you don't care about multiple channels, you
		// can set the namespace to an empty string.
		namespace = '/test';
		// Connect to the Socket.IO server.
		// The connection URL has the following format:
		//     http[s]://<domain>:<port>[/<namespace>]
		var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);
		// Event handler for new connections.
		// The callback function is invoked when a connection with the
		// server is established.
		socket.on('connect', function() {
			socket.emit('my_event', {data: 'I\'m connected!'});
		});
		// Event handler for server sent data.
		// The callback function is invoked whenever the server emits data
		// to the client. The data is then displayed in the "Received"
		// section of the page.
		socket.on('my_response', function(msg) {
			setParams(msg);
		});
	});
}


//this is the animation loop
function animate(time) {
	requestAnimationFrame( animate );
	internalParams.controls.update();
	internalParams.renderer.render( internalParams.scene, internalParams.camera );
}

//this is called to start everything
function WebGLStart(){

//define the params object
	defineInternalParams();
	defineExternalParams();

//initialize everything
	init();

//create the UI
	//createGUI();

//draw everything
	drawScene();

//begin the animation
	animate();
}





