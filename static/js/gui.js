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





