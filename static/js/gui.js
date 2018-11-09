//https://blog.miguelgrinberg.com/post/easy-websockets-with-flask-and-gevent
//https://github.com/miguelgrinberg/Flask-SocketIO
function connectSocketOutput(){
	$(document).ready(function() {

		// Event handler for new connections.
		// The callback function is invoked when a connection with the
		// server is established.
		internalParams.socket.on('connect', function() {
			internalParams.socket.emit('connection_test', {data: 'I\'m connected!'});
		});
		internalParams.socket.on('connection_response', function(msg) {
			console.log(msg);
		});		// Event handler for server sent data.
		// The callback function is invoked whenever the server emits data
		// to the client. The data is then displayed in the "Received"
		// section of the page.
		internalParams.socket.on('from_gui', function(msg) {
			if (msg.data ){
				console.log(msg);
			}

		});
	});
}

//this creates the user interface (gui)
function createGUI(){
	setParamsFromURL();
	setURLvars();


	internalParams.gui = new dat.GUI();
	internalParams.gui.add( externalParams, 'radius', 1,30).onChange(setURLvars);
	internalParams.gui.add( externalParams, 'widthSegments', 3,32).onChange(setURLvars);
	internalParams.gui.add( externalParams, 'heightSegments', 3,32).onChange(setURLvars);
	internalParams.gui.add( externalParams, 'phiStart', 0.,2.*Math.PI).onChange(setURLvars);
	internalParams.gui.add( externalParams, 'phiLength', 0.,2.*Math.PI).onChange(setURLvars);
	internalParams.gui.add( externalParams, 'thetaStart', 0.,2.*Math.PI).onChange(setURLvars);
	internalParams.gui.add( externalParams, 'thetaLength', 0.,2.*Math.PI).onChange(setURLvars);

}





