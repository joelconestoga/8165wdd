function validateSignupUsername(username) {

	var regExpUsername = new RegExp("^[A-z0-9_\\-]{5,}$");

	if(!regExpUsername.test(username.trim())) {
		setValueOf("usernameError", "Username must be of minimum 5 characters and can include letters, numbers and dashes)");
		return false;
	}

	setValueOf("usernameError", "");
	return true;
}

function validateFirstName(firstName) {
	
	var regExpFirstName = new RegExp("^[A-Z][a-z0-9 ]+$");

	if(!regExpFirstName.test(firstName)) {
		setValueOf("firstNameError", "First name can consist of only A-z, 0-9 and spaces. It should start with first letter capital and rest must be lowercase");
		return false;
	}

	setValueOf("firstNameError", "");
	return true;
}

function validateLastName(lastName) {
	
	var regExpLastName = new RegExp("^[A-Z][a-z0-9]+$");

	if(!regExpLastName.test(lastName)) {
		setValueOf("lastNameError", "Last name can consist of only A-z, 0-9 and spaces." +
		 "It should start with first letter capital and rest must be lowercase");
		return false;
	}

	setValueOf("lastNameError", "");
	return true;
}

function validateEmail(email) {
	
	var regExpEmail = new RegExp('(([^<>()\\[\\]\\.,;:\s@"]+(\\.[^<>()\\[\\]\\.,;:\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

	if(!regExpEmail.test(email)) {
		setValueOf("emailError", "Please enter correct Email ID");
		return false;
	}

	setValueOf("emailError", "");
	return true;
}

function validateSignupPassword(password) {
	
	var regExpPassword = new RegExp("^[A-z0-9\\^\\$_\\-\\\\\/]{5,}$");

	if(!regExpPassword.test(password.trim())) {
		setValueOf("passwordError", "Password must be at least 4 characters long and can include A-z, 0-9, ^, -, _, $, /, \\");
		return false;
	}

	setValueOf("passwordError", "");
	return true;
}

function validateConfirmPassword(confirmPassword) {
	
	var password = getValue("register-password");

	if(confirmPassword !== password.trim()) {
		setValueOf("confirmPasswordError", "Passwords do not match");
		return false;	
	}

	setValueOf("confirmPasswordError", "");	
	return true;
}

function validateDate(dateValue) {
    
    var regDate = new RegExp("^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$");

    if (!regDate.test(dateValue)) {
		setValueOf("dateError", "Please enter the Date (in correct format)");
        return false;
    }

	setValueOf("dateError", "");
   	return true;
}

function validateDescription(description) {
	
	var regDescription = new RegExp("^[A-Za-z0-9_\\- ]{10,}$");
	
	if(!regDescription.test(description)) {
		setValueOf("descriptionError", "Minimum 10 characters and can only include characters,numbers,spaces,-,_");
		return false;
	}

	setValueOf("descriptionError", "");
	return true;
}

function validateValue(inputValue) {
	
	var regValue = new RegExp("^[+,-]\\.?[0-9]+(\\.[0-9]+)?$");

	if(!regValue.test(inputValue)) {
		setValueOf("valueError", "Amount requires +/- prefix.");
		return false;
	}

	var amount = 0;
	
	try {
		var amount = Number.parseFloat(inputValue.substr(1)).toFixed(2);	
	} catch(e) {
		setValueOf("valueError", "Invalid amount.");
		return false;
	}

	if(amount > 10000){
		setValueOf("valueError", "Amount exceeds +/- 10,000.00");
		return false;
	}

	setValueOf("valueError", "");
	return true;
}

function getElement(elementId) {

	var element = document.getElementById(elementId);
	
	if (element == null) {
		alert("There's been an error while loading the page: " + elementId);
		throw new ElementNotFoundException(elementId);
	}

	return element;
}

function getValue(elementId) {
	return getElement(elementId).value;
}

function setValueOf(elementId, content) {
	var element = getElement(elementId);
	element.innerHTML = content;
}