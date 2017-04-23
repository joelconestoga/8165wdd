
function loadUserDetails(id) {
	createRequest("GET", "/backend/users/" + id + "/", null, userDetailHandler, null);
}

function userDetailHandler(users) {
	if(title = document.getElementById("content-title"))
		title.innerHTML = "All Users";
	users.forEach(printSpecificUser);
}

function printSpecificUser(user) {
	if(element = document.getElementById("user-name"))
		element.innerHTML = "User: " + user.username;
	if(element = document.getElementById("first-name"))
		element.innerHTML = "First name: " + user.first_name;
	if(element = document.getElementById("last-name"))
		element.innerHTML = "Last name: " + user.last_name;
	if(element = document.getElementById("email"))
		element.innerHTML = "Email: " + user.email;
}

