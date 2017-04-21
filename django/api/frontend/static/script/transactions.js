window.onload = function() {
	console.log(" --------- Transactions loading");

	createRequest("GET", "/backend/users/"+window.localStorage.getItem('token')[0]+"/", null, userDetailHandler, null);
	createRequest("GET", "/backend/users/"+window.localStorage.getItem('token')[0]+"/transactions", null, transactionsHandler, null);
}

function transactionsHandler(transactions) {
	if(transactions.length > 0) {
		transactions.forEach(appendTransactionRow);
	} else {
		redirect("/frontend/login/");
	}
}

function userDetailHandler(users) {
	users.forEach(printSpecificUser);
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

function appendTransactionRow(transaction) {

    var row = "<tr>" +
		      "<td>" + transaction.id + "</td>" +
		      "<td>" + transaction.name + "</td>" +
		      "<td>" + transaction.value + "</td>" +
		      "</tr>";

	if(trans = document.getElementById("table-transactions"))
		trans.innerHTML += row;
}

function log_out() {
	redirect("/frontend/login/");
	createRequest("POST", "/backend/users/"+LocalToken.userId()+"/log_out/", null, logoutHandler, null);
	window.localStorage.removeItem('token');
}

function logoutHandler(error) {
	if(footer = document.getElementById("footer")) {
		if(LocalToken.value())
			footer.innerHTML = "TOKEN [ local: " + LocalToken.value() + " ]";
		else
			footer.innerHTML = "TOKEN [ local: - ]";
	}
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

