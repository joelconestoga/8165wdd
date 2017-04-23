window.onload = function() {
	log("", "Transactions loading");

	if (token = window.localStorage.getItem('token')) {
		loadUserDetails(window.localStorage.getItem('token')[0]);
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
		      "</tr>";

	if(trans = document.getElementById("table-transactions"))
		trans.innerHTML += row;
}




