window.onload = function() {
	console.log(" --------- Transactions loading");
	createRequest("GET", "/backend/users/"+LocalToken.userId()+"/", userDetailHandler);
	createRequest("GET", "/backend/users/"+LocalToken.userId()+"/transactions", transactionsHandler);
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
	createRequest("POST", "/backend/users/"+LocalToken.userId()+"/log_out/", logoutHandler);
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
