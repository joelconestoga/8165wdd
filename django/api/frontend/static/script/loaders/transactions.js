window.onload = function() {
	log("", "Transactions loading");

	if (token = window.localStorage.getItem('token')) {
		loadUserDetails(window.localStorage.getItem('token')[0]);
		requestCategories(filterCategoriesHandler, transactionErrorHandler);
		createRequest("GET", "/backend/users/"+window.localStorage.getItem('token')[0]+"/transactions", null, transactionsHandler, transactionErrorHandler);
	} else {
		transactionErrorHandler()		
	}
}

function transactionsHandler(transactions) {
	if(title = document.getElementById("content-title"))
		title.innerHTML = "Transactions";
	transactions.forEach(appendTransactionRow);
}

function transactionErrorHandler() {
	redirect("/frontend/login/");
}

function appendTransactionRow(transaction) {

    var row = "<tr>" +
		      "<td>" + transaction.id + "</td>" +
		      "<td>" + transaction.name + "</td>" +
		      "<td>" + transaction.value + "</td>" +
		      "<td>" + transaction.category + "</td>" +
		      "</tr>";

	if(trans = document.getElementById("table-transactions"))
		trans.innerHTML += row;
}

function filterCategoriesHandler(categories) {
	if(filter = document.getElementById("filter-transaction")){
		filter.innerHTML += "<option category_id=0>All</option>";
		categories.forEach(function(category) {
			filter.innerHTML += "<option category_id=" + category.id + ">" + category.name + "</option>";
		})
	}
	addFilterChangeListener();
}

function addFilterChangeListener() {
	if (filter = document.getElementById("filter-transaction")) {

		var filterByCategory1 = function() {
	    	
	    	category_id = this.options[this.selectedIndex].getAttribute("category_id");
	    	user_id = window.localStorage.getItem('token')[0];
	    	
	    	if (category_id == 0)
	    		url = "/backend/users/" + user_id + "/transactions"
	    	else
	    		url = "/backend/users/" + user_id + "/categories/" + category_id + "/transactions"

	    	createRequest("GET", url, null, filteredTransactionsHandler, transactionErrorHandler);
		};

		filter.addEventListener('change', filterByCategory1, false);
	}
}

function filteredTransactionsHandler(transactions) {
	if(table = document.getElementById("table-transactions")) {
		table.innerHTML = "";
		transactionsHandler(transactions);
	}
}




