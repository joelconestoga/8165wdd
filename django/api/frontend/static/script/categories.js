window.onload = function() {
	log("", "Categories loading");

	if (token = window.localStorage.getItem('token')) {
		loadUserDetails(window.localStorage.getItem('token')[0]);
		createRequest("GET", "/backend/categories/", null, categoriesHandler, categoriesErrorHandler);
	} else {
		transactionErrorHandler();		
	}
}

function categoriesHandler(categories) {
	if(title = document.getElementById('content-title'))
		title.innerHTML = "All Categories";
	categories.forEach(appendCategoriesRow);
	addDetailButtonListeners();
}

function appendCategoriesRow(category) {

    var row = "<tr>" +
		      "<td>" + category.name + "</td>" +
		      "<td><button data-id='" + category.id + "' class='category-detail-button'>View Details</td>" +
		      "<td><button data-id='" + category.id + "' class='category-transactions-button'>View Transactions</td>" +
		      "</tr>";

	if(categories = document.getElementById("table-categories"))
		categories.innerHTML += row;
}

function categoriesErrorHandler() {
	redirect("/frontend/transactions/");
}

function addDetailButtonListeners() {
	var buttons = document.getElementsByClassName("category-detail-button");
	if(buttons) {
		Array.from(buttons).forEach(addDetailListener);	
	}
}

function addDetailListener(button) {

	var showCategoryDetails = function() {
		var id = this.getAttribute("data-id");
		alert(id);
  //   	var details = document.getElementById("details"); 
		
		// if(details) {
		// 	if(trans[id].Location == null) {
		// 		details.innerHTML = "<p>Date: " + trans[id].Date + "</p>" + 
  //   												   	   "<p>Description: " + trans[id].Description + "</p>";	
		// 	}
  //   		else {
  //   			details.innerHTML = "<p>Date: " + trans[id].Date + "</p>" + 
  //   												   "<p>Location: " + trans[id].Location + "</p>";
  //   		}
		// }	
	};

	button.addEventListener('click', showCategoryDetails, false);
}
