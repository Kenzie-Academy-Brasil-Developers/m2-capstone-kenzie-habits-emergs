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
      User.showUser()
      window.location.href = "src/views/homePage.html";
    }
    else{
      console.log(response.message)
    }
  }

  static async showUser(){
    const imgSmall = document.querySelector();
    const imgLarge = document.querySelector();
    const userName = document.querySelector();

    imgSmall.src = localStorage.getItem('@capstone-m2:image');
    imgLarge.src = localStorage.getItem('@capstone-m2:image'); 
    userName.textContent = localStorage.getItem('@capstone-m2:user');

  }

  static async editProfile(){
    const btnEdit = document.querySelector('#containerLogo img')
    btnEdit.addEventListener('click',()=>{
      const divModal = document.querySelector('#editProfile');
      divModal.style.display = 'block';

      const nameEdit = document.querySelector('#nameUserEdit');
      nameEdit.textContent = localStorage.getItem('@capstone-m2:user');

      const imageEdit = document.querySelector('#imageUserEdit');
      imageEdit.textContent = localStorage.getItem('@capstone-m2:image');

      const saveEdit = document.querySelector('#btn-saveChangesProfile');
      saveEdit.addEventListener('click',async ()=>{
        const edited = {
          usr_name: `${nameEdit.value}`,
          usr_image: `${imageEdit.value}`
        }
        const response = await Api.updateProfile(edited)
        console.log(response)
      })
    
    })
  }

  static async logout(){
    console.log(Api.token)
  }
}

User.logout()