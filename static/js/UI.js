function setURLvars(){
	var keys = Object.keys(externalParams);
	var vars = "/"
	keys.forEach(function(k) {
		if (k != "gui"){
			vars += "?"+k+"="+externalParams[k];
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
function createUI(){
	setParamsFromURL();
	setURLvars();


	externalParams.gui = new dat.GUI();
	externalParams.gui.add( externalParams, 'radius', 1,30).onChange(setURLvars);
	externalParams.gui.add( externalParams, 'widthSegments', 3,32).onChange(setURLvars);
	externalParams.gui.add( externalParams, 'heightSegments', 3,32).onChange(setURLvars);
	externalParams.gui.add( externalParams, 'phiStart', 0.,2.*Math.PI).onChange(setURLvars);
	externalParams.gui.add( externalParams, 'phiLength', 0.,2.*Math.PI).onChange(setURLvars);
	externalParams.gui.add( externalParams, 'thetaStart', 0.,2.*Math.PI).onChange(setURLvars);
	externalParams.gui.add( externalParams, 'thetaLength', 0.,2.*Math.PI).onChange(setURLvars);

}





