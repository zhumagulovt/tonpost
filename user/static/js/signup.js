var form  = document.getElementsByTagName('form')[0];

var login = document.getElementById('login');
var email = document.getElementById('email');
var password = document.getElementById('password');
var password2 = document.getElementById('password2');

var errorLogin = document.querySelector('.errorlogin');
var errorEmail = document.querySelector('.erroremail');
var errorPassword = document.querySelector('.errorpassword');
var errorPassword2 = document.querySelector('.errorpassword2');


login.addEventListener("input", function (event) {
    let checkSymbol = /^[a-zA-Z0-9_]+$/.test(login.value);
    let checkLen = login.value.length >= 4 && login.value.length <= 15;

    if (login.value !== "" && checkSymbol && checkLen){
        login.classList.remove("invalid");
        errorLogin.innerHTML = "";
        errorLogin.className = "error";
    }

}, false );


email.addEventListener("input", function (event) {
    if (email.validity.valid) {
        email.classList.remove("invalid");
        errorEmail.innerHTML = "";
        errorEmail.className = "error";
      }
}, false );


password.addEventListener("input", function (event) {
    let checkSymbol = /(?=.*[0-9])(?=.*[a-z])/.test(password.value);
    let checkLen = password.value.length >= 6;

    if (checkSymbol && checkLen){
        password.classList.remove("invalid");
        errorPassword.innerHTML = "";
        errorPassword.className = "error";
    }
}, false );


password2.addEventListener("input", function (event) {
    if (password.value === password2.value){
        password2.classList.remove("invalid");
        errorPassword2.innerHTML = "";
        errorPassword2.className = "error";
    }
}, false );



form.addEventListener("submit", function (event) {
    checklogin: {
        let checkSymbol = /^[a-zA-Z0-9_]+$/.test(login.value);
        let checkLen = login.value.length >= 4 && login.value.length <= 15;

        if (!checkSymbol){
            errorLogin.innerHTML = "Допустимо использовать только латинские символы, цифры и знак: &quot;_&quot;";
            errorLogin.className = "error active";
            login.classList.add("invalid")
            event.preventDefault();
        } else if (!checkLen) {
            errorLogin.innerHTML = "Длина логина должна быть не меньше 4 символов";
            errorLogin.className = "error active";
            login.classList.add("invalid")
            event.preventDefault();
        }
    }

    checkemail: {
        if (!email.validity.valid) {
            errorEmail.innerHTML = "Введите правильный e-mail вида: &quot;example@host.com&quot;";
            errorEmail.className = "error active";
            email.classList.add("invalid");
            event.preventDefault();
        }
    }

    checkpassword: {
        let checkSymbol = /(?=.*[0-9])(?=.*[a-z])/.test(password.value);
        let checkLen = password.value.length >= 6;

        if (!checkSymbol){
            errorPassword.innerHTML = "Пароль должен состоять из: цифр, букв латинского алфавита";
            errorPassword.className = "error active";
            password.classList.add("invalid");
            event.preventDefault();
        } else if (!checkLen){
            errorPassword.innerHTML = "Пароль должен состоять минимум из 6 символов";
            errorPassword.className = "error active";
            password.classList.add("invalid");
            event.preventDefault();
        }

        if (password.value !== password2.value){
            errorPassword2.innerHTML = "Повторно введенный пароль не совпадает с первым";
            errorPassword2.className = "error active";
            password2.classList.add("invalid");
            event.preventDefault();
        }
    }
}, false );