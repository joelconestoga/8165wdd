window.onload = function() {
	log("", "Categories loading");

	if (token = window.localStorage.getItem('token')) {
		loadUserDetails(window.localStorage.getItem('token')[0]);
		createRequest("GET", "/backend/categories/", null, categoriesHandler, categoriesErrorHandler);
	} else {
		transactionErrorHandler()		
	}
}

allCategories = {};

function categoriesHandler(categories) {
	if(title = document.getElementById("content-title"))
		title.innerHTML = "All Categories";
	
	allCategories.all = categories;

	categories.forEach(appendCategoriesRow);
	addDetailButtonListeners();
}

function appendCategoriesRow(category, index) {

    var row = "<tr>" +
		      "<td>" + category.id + "</td>" +
		      "<td>" + category.name + "</td>" +
			  "<td><button class='btn btn-sm btn-default waves-effect view-detail-button' data-id='" + index + 
			  "' data-toggle='modal' data-target='#viewCategory'>View</button>" +
          	  "</td>"+
		      "</tr>";

	if(categories = document.getElementById("table-categories"))
		categories.innerHTML += row;
}

function addDetailButtonListeners() {
	if (detailButtons = document.getElementsByClassName("view-detail-button"))
		Array.from(detailButtons).forEach(addDetailListener);	
}


function addDetailListener(button) {

	var showTransactionDetails = function() {
		var categories = allCategories.all;
    	var index = this.getAttribute("data-id");
    	
		if(details = document.getElementById("details")) {
   			details.innerHTML = "<p>Date: " + categories[index].id + "</p>" + 
   								"<p>Location: " + categories[index].name + "</p>";
		}	
	};

	button.addEventListener('click', showTransactionDetails, false);
}


function categoriesErrorHandler() {
	redirect("/frontend/transactions/");
}

