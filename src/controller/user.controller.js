import Api from "./api.controller.js";

export default class User {

  static showUser() {

    const imgSmall = document.querySelector('#containerLogo img');
    const imgLarge = document.querySelector('#userContainer img');
    const userName = document.querySelector('#userContainer h2');
    imgSmall.src = localStorage.getItem('@capstone-m2:image');
    imgLarge.src = localStorage.getItem('@capstone-m2:image');
    userName.textContent = localStorage.getItem('@capstone-m2:user');

  }

  static async login(user, password) {
    const dataUser = {
      email: `${user}`,
      password: `${password}`
    };

    const response = await Api.loginProfile(dataUser);
    if (response.token !== undefined) {
      const userName = localStorage.setItem('@capstone-m2:user', response.response.usr_name);
      const userEmail = localStorage.setItem('@capstone-m2:email', response.response.usr_email);
      const userImage = localStorage.setItem('@capstone-m2:image', response.response.usr_image);
      window.location.href = "src/views/homePage.html";
    }
    else {
      console.log(response.message)
    }
  }


  static async editProfile() {
    const btnEdit = document.querySelector('#userContainer img')
    btnEdit.addEventListener('click', () => {
      const divModal = document.querySelector('#editProfile');
      divModal.style.display = 'flex';

      const modalEdit = document.querySelector('#editProfile');

      const btnClose = document.querySelector('#btn-saveChangesProfileClose');
      btnClose.addEventListener('click',()=>{
        modalEdit.style.display = 'none';
      })

      const nameEdit = document.querySelector('#nameUserEdit');
      nameEdit.value = localStorage.getItem('@capstone-m2:user');

      const imageEdit = document.querySelector('#imageUserEdit');
      imageEdit.value = localStorage.getItem('@capstone-m2:image');

      const saveEdit = document.querySelector('#btn-saveChangesProfile');
      saveEdit.addEventListener('click', async () => {
        const edited = {
          usr_name: `${nameEdit.value}`,
          usr_image: `${imageEdit.value}`
        }
        const response = await Api.updateProfile(edited)
        console.log(response)
        if(response){
          localStorage.setItem('@capstone-m2:user',response.usr_name);
          localStorage.setItem('@capstone-m2:image', response.usr_image);
        }
        User.showUser();
        modalEdit.style.display = 'none';
      })

    })
  }

  static async logout() {
    const btnLogout = document.querySelector('#containerLogo img');
    btnLogout.addEventListener('click', () => {
      window.location.href = '../../index.html';
      localStorage.removeItem('@capstone-m2:user');
      localStorage.removeItem('@capstone-m2:token');
      localStorage.removeItem('@capstone-m2:image');
      localStorage.removeItem('@capstone-m2:email');
    })
  }
}
