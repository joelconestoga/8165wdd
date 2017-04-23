function requestCategories(responseHandler, errorHandler) {
	createRequest("GET", "/backend/categories/", null, responseHandler, errorHandler);
}

