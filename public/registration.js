var username = document.getElementById('user_email');
var register = document.getElementById('registerbtn');
var password = document.getElementById('user_pword');
var password2 = document.getElementById('user_pword2');

function myFunction() {
	swal({
			title: "Welcome!",
			text: "Enter a valid email address:",
			type: "input",
			closeOnConfirm: false,
			animation: "slide-from-top"
		},
		function(inputValue) {
			if (inputValue === false) return false;

			if (inputValue === "") {
				swal.showInputError("Error: Email cannot be blank!");
				return false
			}
			var username = inputValue;
			//connect to the server


			// if (inputValue !== /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue)) {
			// 	swal.showInputError("Error: You must enter a valid email address!");
			// 	return false;
			// }

			swal({
					title: " ",
					text: "Please choose a password:",
					type: "input",
					closeOnConfirm: false
				},

				function(inputValue) {
					if (inputValue === false) return false;
					if (inputValue === "") {
						swal.showInputError("Error: Password cannot be blank!")
						return false
					}
					if (inputValue.length < 6) {
						swal.showInputError("Error: Password must contain at least six characters!")
						return false;
					}

					var password = inputValue
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

							//register.href = '/registration';

						} else {
							swal.showInputError('An error occurred!');
						}
					};


					xhr.send(JSON.stringify({
						username: username,
						password: password
					}));
					swal({
							title: "THANKYOU!",
							text: "",
							type: "success",
							closeOnConfirm: false,
							confirmButtonText: "Click to continue to log-in"
						},
						function() {
							swal({
								title: "Log-in",
								text: "Email address and password:",
								closeOnConfirm: false,
								html: <input id="swal-input1" class="swal-input"> +
									<input id="swal-input2" class="swal-input">

						})
						}
					)
				});
		});
};



register.addEventListener('click', (e) => {
	if (checkForm()) {

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

				//register.href = '/registration';

			} else {
				alert('An error occurred!');
			}
		};


		xhr.send(JSON.stringify({
			username: username.value,
			password: password.value
		}));


	} else {
		//edited start page with red letter error
	}

})

function checkForm() {
	if (username.value == "") {
		alert("Error: Email cannot be blank!");
		user.focus();
		return false;
	}
	if (username.value == /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
		alert("Error: You must enter a valid email address!");
		user.focus();
		return false;
	}
	if (password.value != "" && password.value == password2.value) {
		if (password.value.length < 6) {
			alert("Error: Password must contain at least six characters!");
			password.focus();
			return false;
		}
		if (password.value == username.value) {
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