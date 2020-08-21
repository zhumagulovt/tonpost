
var form  = document.getElementsByTagName('form')[0];
var error = document.querySelector('.errortitle');
var title = document.getElementById('title');
var post = document.getElementById('post');
var errorPost = document.querySelector('.errorpost');


title.addEventListener("input", function (event) {

    let b = title.value.replace(/\s+/g, '');
    error0 = /[a-zа-яё]/i.test(title.value);
    error1 = title.value.length < 200 && title.value.length > 3;
    error2 = b.length > 3;
    if(error1 && error2 && error0) {
        title.classList.remove('invalid');
        error.innerHTML = ""; 
        error.className = "error"; 
    }


}, false);


post.addEventListener("input", function (event) {

    let b = post.value.replace(/\s+/g, '');

    if(post.value.length < 2500 && b.length > 10){
        post.classList.remove('invalid');
        post.classList.remove('valid');
        errorPost.innerHTML = ""; 
        errorPost.className = "error"; 
    }

}, false);


form.addEventListener("submit", function (event) {

  let b = title.value.replace(/\s+/g, '');
  error0 = /[a-zа-яё]/i.test(title.value);
  error1 = title.value.length < 200 && b.length > 3;

  if (!error1){
    error.innerHTML = "Длина названия публикации должна быть больше трех символов (без пробелов) и меньше 200";
    error.className = "error active";
    title.classList.add("invalid")
    event.preventDefault(); 
  } 
  else if(!error0){
    error.innerHTML = "В названии должны быть буквы";
    error.className = "error active";
    title.classList.add("invalid")
    event.preventDefault();
  }else if(b.length === 0){
    error.innerHTML = "Название не может состоять только из пробелов";
    error.className = "error active";
    title.classList.add("invalid")
    event.preventDefault();
  }

  let b1 = post.value.replace(/\s+/g, '');
  if(post.value.length > 2500){
    errorPost.innerHTML = "Количество символов в тексте должно не превышать 2500 символов";
    errorPost.className = "error active";
    post.classList.add("invalid")
    event.preventDefault();
  } else if(b1 < 10){
    errorPost.innerHTML = "Количество символов в тексте должно превышать 10 символов не считая пробелов";
    errorPost.className = "error active";
    post.classList.add("invalid")
    event.preventDefault();
  }
}, false);