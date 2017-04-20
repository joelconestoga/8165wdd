window.onload = function() {
	console.log(" --------- Index loading");
	validateSession();
}

function validateSession() {
	if(token = window.localStorage.getItem('token'))
		redirect("/frontend/transactions/");
	else
		redirect("/frontend/login/");
}

