function createRequest(method, url, input, responseHandler, errorHandler) {

	console.log(" --------- REQUEST: " + url);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        
        if (request.readyState != XMLHttpRequest.DONE)
        	return;

        if (request.status != 200) {
			console.log('ERROR. Status returned: ' + request.status);

			if (errorHandler)
				return errorHandler(request)
        }

		if(!request.responseText)
			return;
		
		response = JSON.parse(request.responseText);

		console.log(" --------- RESPONSE:");
		console.log(response);

		if (responseHandler)
			responseHandler(response['elements']);

		tokenHandler(response['token']);
    }

    request.open(method, url, true);
    request.setRequestHeader('Authorization', window.localStorage.getItem('token'));
    request.send(input);
}

function redirect(target) {
	console.log(" --------- redirecting from " + window.location.toString() + " --------- to " + target);
	window.location.replace(target);
}

function tokenHandler(token) {
	if(!token)
		return;

	if(footer = document.getElementById("footer"))
		footer.innerHTML = "TOKEN [ sent: " + LocalToken.value() + " / received: " + token.value +" ]";

	window.localStorage.setItem('token', token.value);
}

var LocalToken = {
	value: function() { 
		return window.localStorage.getItem('token');
	},
	userId: function() {
		return this.value() ? this.value()[0] : "0";
	}
}


