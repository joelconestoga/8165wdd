window.onload = function() {
	log("", "Categories loading");

	if (token = window.localStorage.getItem('token')) {
		loadUserDetails(window.localStorage.getItem('token')[0]);
		createRequest("GET", "/backend/categories/", null, categoriesHandler, categoriesErrorHandler);
	} else {
		transactionErrorHandler()		
	}
}

function categoriesHandler(categories) {
	if(title = document.getElementById("content-title"))
		title.innerHTML = "All Categories";
	categories.forEach(appendCategoriesRow);
	addDetailButtonListeners();
}

function appendCategoriesRow(category, index) {

    var row = "<tr>" +
		      "<td>" + category.id + "</td>" +
		      "<td>" + category.name + "</td>" +
			  "<td><button class='btn btn-sm btn-default waves-effect view-detail-button' data-id='" + category.id + 
			  "' data-toggle='modal' data-target='#viewCategory'>View</button>" +
          	  "</td>"+
		      "</tr>";

	if(categories = document.getElementById("table-categories"))
		categories.innerHTML += row;
}

function categoriesErrorHandler() {
	redirect("/frontend/transactions/");
}

function addDetailButtonListeners() {
	if (detailButtons = document.getElementsByClassName("view-detail-button"))
		Array.from(detailButtons).forEach(addDetailListener);	
}

function addDetailListener(button) {

	var showTransactionDetails = function() {
    	var id = this.getAttribute("data-id");
    	
    	createRequest("GET", "/backend/categories/" + id, null, categoryDetailHandler, categoriesErrorHandler);

	};

	button.addEventListener('click', showTransactionDetails, false);
}

function categoryDetailHandler(categories) {
	categories.forEach(function(category) {
		if(details = document.getElementById("details")) {
				details.innerHTML = "<p>Id: " + category.id + "</p>" + 
									"<p>Description: " + category.name + "</p>";
		}	
	})
}


