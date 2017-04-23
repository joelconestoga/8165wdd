
function allUsers() {
	redirect("/frontend/users/");
}

function logOut() {
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



