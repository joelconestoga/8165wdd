window.onload = function() {
	console.log(" --------- Login loading");

	bindSubmitListener();
}

function bindSubmitListener() {
	if(form = document.getElementById("login-form")) {
		form.addEventListener("submit",function(e) {
			e.preventDefault();

			var formData = new FormData();
			formData.append('username', document.getElementById('login-username').value);
			formData.append('password', document.getElementById('login-password').value);

			createRequest("POST", "/backend/log_in/", formData, loginHandler, loginErrorHandler);

		},false);		
 	}	
}

function loginHandler() {
	redirect("/frontend/transactions/");
}

function loginErrorHandler() {
	redirect("/frontend/login/");
}
