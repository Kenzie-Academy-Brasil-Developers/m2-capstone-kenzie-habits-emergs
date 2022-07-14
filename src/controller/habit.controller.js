import Api from "./api.controller.js";
import User from "./user.controller.js";
export default class Habit {
  static table = document.querySelector(".table");
  static createButton = document.querySelector("#createButton");
  static mmodal = document.querySelector("#createHabits");
  static submitCreate = document.querySelector("#createForm");
  static modalEdit = document.querySelector("#editHabits");
  static editForm = document.querySelector("#formEdit");
  static buttonEditModal = document.querySelector("#btn-saveChangesProfile");
  static buttonDelete = document.querySelector("#btn-delete");
  static buttonComplete = document.querySelector("#completeButton");
  static buttonAll = document.querySelector("buttonAll");
  static modalDelete = document.querySelector("#btn-delete");
  static async createHabits() {
    this.createButton.addEventListener("click", () => {
      this.mmodal.classList.remove("display_none");
    });

    this.submitCreate.addEventListener("submit", async (e) => {
      e.preventDefault();
      const descData = [...this.submitCreate.elements];
      const newObject = {
        title: descData[0].value,
        description: descData[1].value,
        category: descData[2].value,
      };
      await Api.createHabits(newObject);
      alert("Nova Tarefa adicionada");
      this.mmodal.classList.add("display_none");
      location.reload();
    });
    addEventListener("click", (e) => {
      const target = e.target;
      if (target.id == "btn-createHabitsClose") {
        this.mmodal.classList.add("display_none");
      }
    });
  }
  static async editHabits() {
    addEventListener("click", async (e) => {
      const target = e.target;
      if (target.className == "btn-Edit") {
        this.modalEdit.classList.remove("display_none");
        localStorage.setItem("@capstone-m2:idPost", target.id);
      }
      if (target.id == "btn-editHabitsClose") {
        this.modalEdit.classList.add("display_none");
      }
    });
    this.editForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const descData = [...this.editForm.elements];

      const newObject = {
        title: descData[0].value,
        description: descData[1].value,
        category: descData[2].value,
      };
      const idPost = localStorage.getItem("@capstone-m2:idPost");

      await Api.updateHabit(idPost, newObject);
      location.reload();
      alert("atividade editada");
      this.modalEdit.classList.add("display_none");
    });
  }
  static async deleteHabits() {
    this.buttonDelete.addEventListener("click", async () => {
      const idPost = localStorage.getItem("@capstone-m2:idPost");
      this.modalEdit.classList.add("display_none");
      // this.modalDelete.classList.remove('display_none')
      await Api.deleteHabit(idPost);
      location.reload();
    });
  }
  static async listHabits() {
    const response = await Api.readHabits();

    response.forEach((e) => {
      const tr = document.createElement("tr");
      tr.classList.add("habitLine");
      const lineCheckbox = document.createElement("td");
      const inputCheckbox = document.createElement("input");
      inputCheckbox.type = "checkbox";
      inputCheckbox.classList.add("checkboxHabits");
      inputCheckbox.id = `check${e.habit_id}`;
      if (e.habit_status == true) {
        inputCheckbox.checked = true;
      }
      lineCheckbox.append(inputCheckbox);
      const title = document.createElement("td");
      title.innerText = `${e.habit_title}`;
      const description = document.createElement("td");
      description.innerText = `${e.habit_description}`;
      const category = document.createElement("td");
      const span = document.createElement("span");
      category.append(span);
      span.innerText = `${e.habit_category}`;
      category.classList.add("tableCategory");
      const editar = document.createElement("td");
      editar.innerHTML = `<button id='${e.habit_id}' class='btn-Edit'>editar</button>`;
      this.table.append(tr);
      tr.append(lineCheckbox, title, description, category, editar);
      inputCheckbox.addEventListener("change", async () => {
        if (inputCheckbox.checked) {
          await Api.completeHabit(e.habit_id);
        }
      });
    });
  }

  static async listHabitsCheckeds() {}
}
Habit.createHabits();
Habit.editHabits();
Habit.listHabits();
Habit.listHabitsCheckeds();
Habit.deleteHabits();
User.showUser();
User.logout();
User.editProfile();
