//Next step is to use the token to identify the user on certain pages and you're good to go.

window.onload = function() {
	console.log(" --------- Index loading");
	validateSession();
}

function validateSession() {
	createRequest("GET", "/backend/log_in/", null, sessionHandler, sessionErrorHandler);
}

function sessionHandler() {
	console.log(" --------- CHAMOU sessionHandler");
	redirect("/frontend/transactions/");
}

function sessionErrorHandler() {
	console.log(" --------- CHAMOU errorHANDLER");
	redirect("/frontend/login/");
}

