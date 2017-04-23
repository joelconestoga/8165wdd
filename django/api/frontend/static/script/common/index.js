window.onload = function() {
	console.log(" --------- Index loading");
	validateSession();
}

function validateSession() {
	createRequest("GET", "/backend/log_in/", null, sessionHandler, sessionErrorHandler);
}

function sessionHandler() {
	redirect("/frontend/transactions/");
}

function sessionErrorHandler() {
	redirect("/frontend/login/");
}

