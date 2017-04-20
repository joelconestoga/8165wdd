window.onload = function() {
	console.log(" --------- Login loading");
}

function login() {

	var form = document.getElementById("login-form");
	
	if(form.addEventListener){
	    form.addEventListener("submit", loginHandler, false);  //Modern browsers
	}else if(form.attachEvent){
	    form.attachEvent('onsubmit', loginHandler);            //Old IE
	}
}

function loginHandler(request) {
	alert(request);
}
