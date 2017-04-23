window.onload = function() {
	console.log(" --------- Add-category loading");
	bindCategorySubmitListener();
}

function bindCategorySubmitListener() {
	if(form = document.getElementById("category-form")) {
		form.addEventListener("submit",function(e) {

			e.preventDefault();

			var formData = new FormData();
			formData.append('name', document.getElementById('category-name').value);

			createRequest("POST", "/backend/add_category/", 
				formData, addCatetoryHandler, addCategoryErrorHandler);

		},false);		
 	}	
}

function addCatetoryHandler() {
	redirect("/frontend/categories/");
}

function addCategoryErrorHandler() {
	redirect("/frontend/add-category/");
}

