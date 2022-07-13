import Api from "./api.controller.js";

export default class User{

  static async login(user,password){
    const dataUser = {
      email: `${user}`,
      password: `${password}`
    };

    const response = await Api.loginProfile(dataUser);
    if(response.token !== undefined){
      const userName = localStorage.setItem('@capstone-m2:user',response.response.usr_name);
      const userEmail = localStorage.setItem('@capstone-m2:email',response.response.usr_email);
      const userImage = localStorage.setItem('@capstone-m2:image',response.response.usr_image);
      window.location.href = "src/views/homePage.html";
    }
    else{
      console.log(response.message)
    }
  }

  static async showUser(){
    const img = document.querySelector()
    const userName = do
  }
}