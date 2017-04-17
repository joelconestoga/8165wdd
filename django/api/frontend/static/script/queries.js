window.onload = function() {
	getAllUsers();
}

function getAllUsers() {
	createRequest("GET", "/backend/users/", usersHandler);
	createRequest("GET", "/backend/users/2/", userDetailHandler);
}

function createRequest(method, url, responseHandler) {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        
        if (request.readyState != XMLHttpRequest.DONE)
        	return;

        switch (request.status) {

        	case 200:
				var data = JSON.parse(request.responseText);
				responseHandler(data);
				break;

			case 400:
				alert('There was an error 400');
				break;

			default:
				msg = 'something else other than 200 was returned: ' + request.status;
				alert(msg);
				console.log(msg);
        }
    }

    request.open(method, url, true);
    request.send();
}

function usersHandler(users) {
	users.forEach(appendUserRow);
}

function userDetailHandler(users) {
	users.forEach(printSpecificUser);
}

function appendUserRow(user) {

    var row = "<tr>" +
		      "<td>" + user.id + "</td>" +
		      "<td>" + user.username + "</td>" +
		      "</tr>";

	if(tableBody = document.getElementById("tableBody"))
		tableBody.innerHTML += row;
}

function printSpecificUser(user) {
	document.getElementById("specific").innerHTML = user.id + ":" + user.username;
}
