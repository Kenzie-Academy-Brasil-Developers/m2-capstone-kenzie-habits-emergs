import User from "../controller/user.controller.js";

function run(){
  const user = document.querySelector('#user');
  const password = document.querySelector('#password');
  const btnLogin = document.querySelector('#buttonLogin');

  btnLogin.addEventListener('click',(e)=>{
    e.preventDefault();
    User.login(user.value,password.value)
    })
}

run()
