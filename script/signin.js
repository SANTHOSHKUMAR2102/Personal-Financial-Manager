const form =document.querySelector("#form");
const loginusername = document.querySelector("#uname");
const loginpassword = document.querySelector("#password");

let success = true;


form.addEventListener('submit', (e) => {

      if(!validation()){
        e.preventDefault();
      }  

  }

)

function validation() {

  const logusernameVal = loginusername.value.trim();
  const logpasswordVal = loginpassword.value.trim();

  var storedUsernameString= localStorage.getItem('username');
  var storedUsername = JSON.parse(storedUsernameString);
  var storedpasswordString= localStorage.getItem('userpassword');
  var storedUserpassword = JSON.parse(storedpasswordString);

  if (logusernameVal === storedUsername && logpasswordVal === storedUserpassword){
    setSuccess(loginusername)
    setSuccess(loginpassword)
    window.location.href = 'index.html'
  }
  else if (logusernameVal === storedUsername && logpasswordVal !== storedUserpassword){
    setSuccess(loginusername)
    setError(loginpassword, 'incorrect password');
  }
  else if(logusernameVal !== storedUsername && logpasswordVal === storedUserpassword){
    setError(loginusername, 'Username is invalid');
    setSuccess(loginpassword)
  }
  else{
    setError(loginusername, 'Username is invalid');
    setError(loginpassword, 'incorrect password');
  }

}



function setError(element, message){
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = message;
  inputGroup.classList.add('error');
  inputGroup.classList.remove('success');
}

function setSuccess(element, message){
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = "";
  inputGroup.classList.add('success');
  inputGroup.classList.remove('error');
}