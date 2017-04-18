window.onload = function() {
	getAllUsers();
}

function getAllUsers() {
	createRequest("GET", "/backend/users/", usersHandler);
	createRequest("GET", "/backend/users/2/", userDetailHandler);
	createRequest("GET", "/backend/users/2/transactions", transactionsHandler);
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
				alert('There was an error 400');
				break;

			default:
				msg = 'something else other than 200 was returned: ' + request.status;
				alert(msg);
				console.log(msg);
        }
    }

    request.open(method, url, true);
    request.setRequestHeader('Authorization', localToken());
    request.send();
}

function localToken() {
	return 'Bearer ' + 'secretToken';
}

function tokenHandler(token) {
	
	if(sent = document.getElementById("token-sent"))
		sent.innerHTML = "Token sent: " + localToken();
	
	if(received = document.getElementById("token-received"))
		received.innerHTML = "Token received: " + token.value;
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
	if(specific = document.getElementById("specific"))
		specific.innerHTML = "Specific user: " + user.id + " " + user.username;
}
