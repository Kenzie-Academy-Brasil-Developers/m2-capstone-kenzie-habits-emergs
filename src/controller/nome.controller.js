import Api from "./api.controller.js";

export default class User{

  static async login(user,password){
    const dataUser = {
      email: `${user}`,
      password: `${password}`
    };
    const response = await Api.loginProfile(dataUser);
    if(response.token !== undefined){
      console.log(response.token)
      window.location.href = "../views/nome.views.html";
    }
    else{
      console.log(response.token)
    }
    
  }
}