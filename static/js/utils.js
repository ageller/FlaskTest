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

		// Use a "/test" namespace.
		// An application can open a connection on multiple namespaces, and
		// Socket.IO will multiplex all those connections on a single
		// physical channel. If you don't care about multiple channels, you
		// can set the namespace to an empty string.
		this.namespace = '/test';
		// Connect to the Socket.IO server.
		// The connection URL has the following format:
		//     http[s]://<domain>:<port>[/<namespace>]
		this.socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + this.namespace);
	};
}

//https://html-online.com/articles/get-url-parameters-javascript/
function getURLvars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

function setParamsFromURL(){
	var vars = getURLvars();
	var keys = Object.keys(vars);
	keys.forEach(function(k){
		externalParams[k] = parseFloat(vars[k])
	});
}

//this initializes everything needed for the scene
function initScene(){

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

function setURLvars(){
	var keys = Object.keys(externalParams);
	var vars = "/gui?" //this needs to be the same as what is in flask
	keys.forEach(function(k) {
		if (k != "gui"){
			vars += k+"="+externalParams[k]+"&";
		}
	});
	window.history.pushState("externalParams", "updated", vars);
}


