window.onload = function() {
	console.log(" --------- Register loading");

	bindRegisterSubmitListener();
}

function bindRegisterSubmitListener() {
	if(form = document.getElementById("register-form")) {
		form.addEventListener("submit",function(e) {

			e.preventDefault();

			var formData = new FormData();
			formData.append('username', document.getElementById('register-username').value);
			formData.append('first_name', document.getElementById('register-first-name').value);
			formData.append('last_name', document.getElementById('register-last-name').value);
			formData.append('email', document.getElementById('register-email').value);
			formData.append('password', document.getElementById('register-password').value);
			formData.append('is_staff', document.getElementById('register-staff').value);

			createRequest("POST", "/backend/users/", formData, registerHandler, registerErrorHandler);

		},false);		
 	}	
}

function registerHandler() {
	redirect("/frontend/transactions/");
}

function registerErrorHandler() {
	redirect("/frontend/register/");
}
