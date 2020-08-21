let inputs = document.querySelectorAll('input[data-rule]');

for(let input of inputs){
	input.addEventListener('blur', function(){
		let rule = this.dataset.rule;
		//console.log(rule);
        let value = this.value;
        let check;
		switch(rule){
			case 'login':
                value = value.replace(/ +/g, ' ').trim();
                check = value != "";
                break;
            case 'password':
                value = value.replace(/ +/g, ' ').trim();
                check = value != "";
                break;
        }
        if(check){
            document.getElementById("submit").disabled = false;
        }else{
            document.getElementById("submit").disabled = true;
        }
    });
}


var form = document.getElementsByTagName('form')[0];

var login = document.getElementById('login');
var password = document.getElementById('password');

var errorl = document.querySelector('.errorlogin');
var errorp = document.querySelector('.errorpassword');

login.addEventListener("input", function (event) {
    let b = login.value.replace(/\s+/g, '');
    if (login.value != "" && b != ""){
        login.classList.remove("invalid");
        errorl.innerHTML = ""; 
        errorl.className = "error"; 
    }
}, false );

password.addEventListener("input", function (event) {
    let b = password.value.replace(/\s+/g, '');
    if (password.value != "" && b != ""){
        password.classList.remove("invalid");
        errorp.innerHTML = ""; 
        errorp.className = "error"; 
    }
}, false );

form.addEventListener("submit", function (event) {
    let b = login.value.replace(/\s+/g, '');
    if (login.value === "") {
        errorl.innerHTML = "Пожалуйста введите логин";
        errorl.className = "error active";
        login.classList.add("invalid")
        event.preventDefault(); 
    } else if (b === ""){
        errorl.innerHTML = "Логин не может состоять только из пробелов";
        errorl.className = "error active";
        login.classList.add("invalid")
        event.preventDefault(); 
    }

    let b1 = password.value.replace(/\s+/g, '');
    if (password.value === ""){
        errorp.innerHTML = "Пожалуйста введите пароль";
        errorp.className = "error active";
        password.classList.add("invalid")
        event.preventDefault(); 
    } else if (b1 === ""){
        errorp.innerHTML = "Пароль не может состоять только из пробелов";
        errorp.className = "error active";
        password.classList.add("invalid")
        event.preventDefault(); 
    }
}, false ); 