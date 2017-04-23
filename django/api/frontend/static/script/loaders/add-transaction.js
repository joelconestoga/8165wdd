window.onload = function() {
	console.log(" --------- Add-transaction loading");
	bindTransactionSubmitListener();
	requestCategories(addTransactionCategoriesHandler, addTransactionCategoriesErrorHandler);
}

function bindTransactionSubmitListener() {
	if(form = document.getElementById("transaction-form")) {
		form.addEventListener("submit",function(e) {

			e.preventDefault();

			var formData = new FormData();
			formData.append('name', document.getElementById('transaction-name').value);
			formData.append('value', document.getElementById('transaction-value').value);
			formData.append('category', document.getElementById('transaction-category').value);

			createRequest("POST", "/backend/users/"+window.localStorage.getItem('token')[0]+"/add_transaction/", 
				formData, addTransactionHandler, addTransactionErrorHandler);

		},false);		
 	}	
}

function addTransactionHandler() {
	redirect("/frontend/transactions/");
}

function addTransactionErrorHandler() {
	redirect("/frontend/add-transaction/");
}

function addTransactionCategoriesHandler(categories) {
	categories.forEach(appendCategories);
}

function appendCategories(category) {
	if(categories = document.getElementById("transaction-category"))
		categories.innerHTML += "<option value=" + category.id + ">" + category.name + "</option>";
}

function addTransactionCategoriesErrorHandler() {
	redirect("/frontend/transactions/");
}
