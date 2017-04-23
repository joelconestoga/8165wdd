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
}

function appendCategoriesRow(category) {

    var row = "<tr>" +
		      "<td>" + category.id + "</td>" +
		      "<td>" + category.name + "</td>" +
		      "</tr>";

	if(categories = document.getElementById("table-categories"))
		categories.innerHTML += row;
}

function categoriesErrorHandler() {
	redirect("/frontend/transactions/");
}

