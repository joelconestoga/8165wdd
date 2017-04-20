window.onload = function() {
	console.log(" --------- Login loading");


	if(form = document.getElementById("login-form")) {
		form.addEventListener("submit",function(e) {
			e.preventDefault();
			var formData = new FormData();
			formData.append('username', document.getElementById('login-username').value);
			formData.append('password', document.getElementById('login-password').value);
			myLogin(formData);
		},false);		
 	}	
}

function myLogin(formData) {
	var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
				console.log(xmlhttp.responseText);
				
				var data = JSON.parse(xmlhttp.responseText);

				console.log(" --------- RESPONSE:");
				console.log(data);

				tokenHandler(data['token']);
           }

           else if (xmlhttp.status == 400) {
				alert('There was an error 400');
           }

           else {
               alert('something else other than 200 was returned');
           }
        }
    };
    xmlhttp.open("POST", "/backend/log_in/", true);
    xmlhttp.send(formData);
}

