export default class Api {
  static url_base = "https://habits-kenzie.herokuapp.com/api/";
  static token = localStorage.getItem("@capstone-m2:token");
  static headers = {
    "content-Type": "application/json",
    Authorization: `Bearer ${this.token}`,
  };

  //metodo testado e funcionando...
  //metodo recebe como parametro o objeto com as chaves {email:, password:,}
  static async loginProfile(data) {
    const urlLoginUser = `${this.url_base}/userLogin`;
    const options = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    };
    const response = await fetch(urlLoginUser, options)
      .then((response) => response.json())
      .then((response) => {
        // response.response para acessar os dados do usuario.
        localStorage.setItem("@capstone-m2:token", response.token);
        return response;
      })
      .catch((err) => console.log(err));
    return response;
  }

  //metodo testado e funcionando ...
  //metodo deve receber como parâmetro o link da nova imagem em forma de string
  static async updateProfile(data) {
    const urlEditProfile = `${this.url_base}user/profile`;
    const options = {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    };
    const response = await fetch(urlEditProfile, options)
      .then((response) => response.json())
      .catch((err) => console.log(err));
    return response;
  }

  //metodo testado e funcionando ...
  //metodo deverá receber um objeto que tenha as chaves descritas {title:, description:, category:}
  static async createHabits(data) {
    const urlCreateHabits = `${this.url_base}habits`;
    const createObjectJson = {
      habit_title: data.title,
      habit_description: data.description,
      habit_category: data.category,
    };
    const options = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(createObjectJson),
    };
    const response = await fetch(urlCreateHabits, options)
      .then((response) => response.json())
      .catch((err) => console.log(err));
    return response;
  }

  //metodo testado e funcionando ...
  //metodo não precisa de parametro
  static async readHabits() {
    const urlReadHabits = `${this.url_base}habits`;
    const opitions = {
      method: "GET",
      headers: this.headers,
    };
    const response = await fetch(urlReadHabits, opitions)
      .then((response) => response.json())
      .catch((err) => console.log(err));
    return response;
  }

  //metodo testado e funcionando...
  //o metodo deverá receber a categoria desejada em forma de string)
  static async readHabitsByCategory(data) {
    const urlHabitsByCategory = `${this.url_base}habits/category/${data}`;
    const opitions = {
      method: "GET",
      headers: this.headers,
    };
    const response = await fetch(urlHabitsByCategory, opitions)
      .then((response) => response.json())
      .catch((err) => console.log(err));
    return response;
  }

  // metodo testado e funcionando ...
  // deverá receber como parametro o id do Habito e o corpo da mensagem em forma de objeto com as seguintes chaves{title:, description:, category:,}
  static async updateHabit(id, data) {
    const urlUpdateHabit = `${this.url_base}habits/${id}`;
    const updateBody = {
      habit_title: data.title,
      habit_description: data.description,
      habit_category: data.category,
    };
    const options = {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(updateBody),
    };
    const response = await fetch(urlUpdateHabit, options)
      .then((response) => response.json())
      .catch((err) => console.log(err));
    return response;
  }

  //metodo testado e funcionando...
  //metodo deverá receber como parâmetro o id do post.
  static async completeHabit(id) {
    const urlCompleteHabit = `${this.url_base}habits/complete/${id}`;
    const options = {
      method: "PATCH",
      headers: this.headers,
    };
    const response = await fetch(urlCompleteHabit, options)
      .then((response) => response.json())
      .catch((err) => console.log(err));
    return response;
  }
  // metodo testado e funcionando ...
  //medoto deverá receber como parâmetro o id do post
  static async deleteHabit(id) {
    const urlDeletePost = `${this.url_base}habits/${id}`;
    const options = {
      method: "DELETE",
      headers: this.headers,
    };
    const response = await fetch(urlDeletePost, options)
      .then((response) => response.json())
      .catch((err) => console.log(err));
    return response;
  }
}

// NOSSO LOGIN NA API
// const newuser = {
//   email: "grupo3Sidny@mail.com",
//   password: "8056fd48e7d0634200674f6ea6d79bf2",
// };
