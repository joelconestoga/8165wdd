
var LocalToken = {
	value: function() { 
		return window.localStorage.getItem('token');
	},
	userId: function() {
		return this.value() ? this.value()[0] : "0";
	}
}

function redirect(target) {
	console.log(" --------- redirecting from " + window.location.toString() + " --------- to " + target);
	window.location.replace(target);
}

function createRequest(method, url, responseHandler) {

	console.log(" --------- REQUEST: " + url);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        
        if (request.readyState != XMLHttpRequest.DONE)
        	return;

        if (request.status != 200)
			console.log('ERROR. Status returned: ' + request.status);

		var data = JSON.parse(request.responseText);

		console.log(" --------- RESPONSE:");
		console.log(data);

		tokenHandler(data['token']);
		responseHandler(data['elements']);
    }

    request.open(method, url, true);
    request.setRequestHeader('Authorization', LocalToken.value());
    request.send();
}

function tokenHandler(token) {
	if(footer = document.getElementById("footer"))
		footer.innerHTML = "TOKEN [ sent: " + LocalToken.value() + " / received: " + token.value +" ]";

	window.localStorage.setItem('token', token);
}

function loadUser() {
	//createRequest("GET", "/backend/users/", usersHandler);
}

function usersHandler(users) {
	users.forEach(appendUserRow);
}

function appendUserRow(user) {

    var row = "<tr>" +
		      "<td>" + user.id + "</td>" +
		      "<td>" + user.username + "</td>" +
		      "</tr>";

	if(users = document.getElementById("table-users"))
		users.innerHTML += row;
}

