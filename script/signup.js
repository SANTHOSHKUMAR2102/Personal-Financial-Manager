const username = document.querySelector("#uname");
const email = document.querySelector("#mail");
const password = document.querySelector("#password");
const cpassword = document.querySelector("#password2");
const form = document.querySelector("#form")

let success = true;



form.addEventListener('submit', (e) => {
  
  
  
  if(!validatesInput()){
    e.preventDefault();
  }

 
});

function validatesInput(){
  const usernameVal = username.value.trim();
  const emailVal = email.value.trim();
  const passVal = password.value.trim();
  const cpassVal = cpassword.value.trim();

  if(usernameVal === "" ){
    success = false;
    setError(username, 'Username is required')
  }
  else{
    setSuccess(username);
  }
  if(emailVal === "" ){
    success = false;
    setError(email, 'Email is required')
  }
  else{
    setSuccess(email);
  }
  if(passVal === "" ){
    success = false;
    setError(password, 'Password is required')
  }
  else if(passVal.length<8){
    success = false;
    setError(password, 'Password must be atleast 8 character');
  }
  else{
    setSuccess(password);
  }
  if(cpassVal === '' ){
    success = false;
    setError(cpassword, 'Confirm Password is required')
  }
  else if(cpassVal !== passVal){
    success =  false
    setError(cpassword, "Password doesn't match");
  }
  else{
    setSuccess(cpassword);
    const usernameVal = username.value.trim();
    const passVal = password.value.trim();
    localStorage.setItem('username', JSON.stringify(usernameVal));
    localStorage.setItem('userpassword',JSON.stringify(passVal));
    window.location.href = 'signin.html'
  }

  

}

function setError(element,message){
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector('.error');

  errorElement.innerText = message;
  inputGroup.classList.add('error')
  inputGroup.classList.remove('success')
}

function setSuccess(element,message){
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector('.error');

  errorElement.innerText = "";
  inputGroup.classList.remove('error')
  inputGroup.classList.add('success')
}



