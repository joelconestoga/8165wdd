window.onload = function() {
	console.log(" --------- Register loading");

	bindRegisterSubmitListener();
}

function bindRegisterSubmitListener() {
	if(form = document.getElementById("register-form")) {
		form.addEventListener("submit",function(e) {
			e.preventDefault();

			var username = document.getElementById('register-username').value;
			var first_name = document.getElementById('register-first-name').value;
			var last_name = document.getElementById('register-last-name').value
			var email = document.getElementById('register-email').value;
			var password = document.getElementById('register-password').value;
			var confirmPassword = document.getElementById('register-confirm-password').value
			var is_staff = document.getElementById('register-staff').value;

			if(username && first_name && last_name && email && password && confirmPassword && is_staff) {
			
				var usernameOk = validateSignupUsername(username);
				var firstNameOk = validateFirstName(first_name);
				var lastNameOk = validateLastName(last_name);
				var emailIDOk = validateEmail(email);
				var passwordOk = validateSignupPassword(password);
				var confirmPasswordOk = validateConfirmPassword(confirmPassword);
	
				if(emailIDOk && usernameOk && firstNameOk && lastNameOk && passwordOk && confirmPasswordOk) {
					
					var formData = new FormData();
					
					formData.append('username', username);
					formData.append('first_name', first_name);
					formData.append('last_name', last_name);
					formData.append('email', email);
					formData.append('password', password);
					formData.append('is_staff', is_staff);

					createRequest("POST", "/backend/users/", formData, registerHandler, registerErrorHandler);		
				}
			}
		},false);		
 	}	
}

function registerHandler() {
	redirect("/frontend/transactions/");
}

function registerErrorHandler() {
	redirect("/frontend/register/");
}
