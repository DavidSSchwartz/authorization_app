var user = document.getElementById('user_email');
var register = document.getElementById('registerbtn');
var password = document.getElementById('user_pword');
var password2 = document.getElementById('user_pword2');

register.addEventListener('click', (e) => {


	if (checkForm()) {
		window.open('./webpage.html', '_blank');

		//connect to the server
		var xhr = new XMLHttpRequest();

		// Open the connection.
		xhr.open('POST', '/userinfo', true);

		xhr.setRequestHeader('Content-Type', 'application/json')

		// Set up a handler for when the request finishes.
		xhr.onload = function() {
			if (xhr.status === 200) {
				// File(s) uploaded.
				//uploadButton.innerHTML = 'Upload';
				console.log(xhr.responseText)
				
			} else {
				alert('An error occurred!');
			}
		};



	} else {
		//edited start page with red letter error
	}

})

function checkForm() {
	if (user.value == "") {
		alert("Error: Username cannot be blank!");
		user.focus();
		return false;
	}
	if (password.value != "" && password.value == password2.value) {
		if (password.value.length < 6) {
			alert("Error: Password must contain at least six characters!");
			password.focus();
			return false;
		}
		if (password.value == user.value) {
			alert("Error: Password must be different from Username!");
			password.focus();
			return false;
		}
		re = /[0-9]/;
		if (!re.test(password.value)) {
			alert("Error: password must contain at least one number (0-9)!");
			password.focus();
			return false;
		}
		re = /[a-z]/;
		if (!re.test(password.value)) {
			alert("Error: password must contain at least one lowercase letter (a-z)!");
			password.focus();
			return false;
		}
		re = /[A-Z]/;
		if (!re.test(password.value)) {
			alert("Error: password must contain at least one uppercase letter (A-Z)!");
			password.focus();
			return false;
		}
	} else {
		alert("Error: Please check that you've entered and confirmed your password!");
		password.focus();
		return false;
	}
	return true;

}