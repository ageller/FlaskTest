function updateURL(){
	console.log("/?"+obj.name+"="+obj.value)
	window.history.pushState(obj, obj.name, "/?"+obj.name+"="+obj.value);
}

function updateURLradius() {

	var form = document.createElement("form");
	form.action = "http://localhost:8082";   
	form.style.display = "none";
	
	var element = document.createElement("input"); 
	element.name = "radius";
	element.value = externalParams.radius;
	element.type = "text"

	var submit = document.createElement("input"); 
	submit.type = "submit"

	form.appendChild(element);  
	form.appendChild(submit);  
	document.body.appendChild(form);

	form.submit();

	console.log(externalParams.radius)
}

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





