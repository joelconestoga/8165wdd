window.onload = function() {
	log("", "Users loading");

	if (token = window.localStorage.getItem('token')) {
		loadUserDetails(window.localStorage.getItem('token')[0]);
		createRequest("GET", "/backend/users/", null, usersHandler, usersErrorHandler);
	} else {
		transactionErrorHandler()		
	}
}

function usersHandler(users) {
	users.forEach(appendUsersRow);
}

function usersErrorHandler() {
	redirect("/frontend/transactions/");
}

function appendUsersRow(user) {

    var row = "<tr>" +
		      "<td>" + user.id + "</td>" +
		      "<td>" + user.username + "</td>" +
		      "<td>" + user.email + "</td>" +
		      "<td>" + user.is_staff + "</td>" +
		      "</tr>";

	if(users = document.getElementById("table-users"))
		users.innerHTML += row;
}


