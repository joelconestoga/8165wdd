window.onload = function() {
	console.log(" --------- Login loading");
	
	var form = document.getElementById("loginForm");
	if(form) {
			form.addEventListener("submit",function(e) {
			e.preventDefault();
			myLogin();
		},false);		
	}
	
}

function myLogin() {
	var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {

				/* Get token from JSON */
				alert("done");
				console.log(xmlhttp.responseText);
             //    var data = JSON.parse(xmlhttp.responseText);

             //    data.forEach(function(item) {
             //        console.log(item.id);
             //    });


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
    xmlhttp.send();
	// if(form.addEventListener){
	//     form.addEventListener("submit", loginHandler, false);  //Modern browsers
	// }else if(form.attachEvent){
	//     form.attachEvent('onsubmit', loginHandler);            //Old IE
	// }
}

// function loginHandler(request) {
// 	alert(request);
// }
