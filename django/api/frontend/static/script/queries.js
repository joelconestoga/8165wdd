window.onload = function() {
	window.localStorage.setItem('token', '1, 2017, 4, 18, 1, 35, 13');
	getAllUsers();
}

function getAllUsers() {
	createRequest("GET", "/backend/users/", usersHandler);
	createRequest("GET", "/backend/users/"+LocalToken.userId()+"/", userDetailHandler);
	createRequest("GET", "/backend/users/"+LocalToken.userId()+"/transactions", transactionsHandler);
}

function createRequest(method, url, responseHandler) {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        
        if (request.readyState != XMLHttpRequest.DONE)
        	return;

        switch (request.status) {

        	case 200:
				var data = JSON.parse(request.responseText);
				console.log(data);
				tokenHandler(data['token']);
				responseHandler(data['elements']);
				break;

			case 400:
				console.log('There was an error 400');
				break;

			default:
				msg = 'something else other than 200 was returned: ' + request.status;
				console.log(msg);
        }
    }

    request.open(method, url, true);
    request.setRequestHeader('Authorization', LocalToken.value());
    request.send();
}

var LocalToken = {
	value: function() { 
		return window.localStorage.getItem('token');
	},
	userId: function() {
		return this.value()[0];
	}
}

function tokenHandler(token) {
	
	if(footer = document.getElementById("footer"))
		footer.innerHTML = "TOKEN [ sent: " + token.value + " / received: " + token.value +" ]";
}

function usersHandler(users) {
	users.forEach(appendUserRow);
}

function userDetailHandler(users) {
	users.forEach(printSpecificUser);
}

function transactionsHandler(transactions) {
	transactions.forEach(appendTransactionRow);
}

function appendUserRow(user) {

    var row = "<tr>" +
		      "<td>" + user.id + "</td>" +
		      "<td>" + user.username + "</td>" +
		      "</tr>";

	if(users = document.getElementById("table-users"))
		users.innerHTML += row;
}

function appendTransactionRow(transaction) {

    var row = "<tr>" +
		      "<td>" + transaction.id + "</td>" +
		      "<td>" + transaction.name + "</td>" +
		      "<td>" + transaction.value + "</td>" +
		      "</tr>";

	if(trans = document.getElementById("table-transactions"))
		trans.innerHTML += row;
}

function printSpecificUser(user) {
	if(element = document.getElementById("user-legend"))
		element.innerHTML = "User: " + user.username;
	if(element = document.getElementById("first-name"))
		element.innerHTML = "First name: " + user.first_name;
	if(element = document.getElementById("last-name"))
		element.innerHTML = "Last name: " + user.last_name;
	if(element = document.getElementById("email"))
		element.innerHTML = "Email: " + user.email;
}
