window.onload = function() {
//	window.localStorage.setItem('token', '1, 2017, 4, 18, 1, 35, 13');
	console.log(" --------- Index loading");
	validateSession();
}

function validateSession() {
	console.log(" --------- VALIDATING SESSION - Token:" + LocalToken.value());
	if(token = LocalToken.value())
		redirect("/frontend/transactions/");
	else
		redirect("/frontend/login/");
}

