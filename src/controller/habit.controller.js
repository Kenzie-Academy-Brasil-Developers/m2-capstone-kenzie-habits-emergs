import Api from "./api.controller.js";
export default class Habit {
  static table = document.querySelector(".table");
  static createButton = document.querySelector("#createButton"); //botao de criar que abre o modal.
  static mmodal = document.querySelector("#createHabits"); //query selectior do modal de criação.
  static submitCreate = document.querySelector("#createForm"); //quyeryselecotr do form de criação.
  static modalEdit = document.querySelector("#editHabits"); //queryselector do form do modal de editar
  static editForm = document.querySelector("#formEdit"); //queryselector do form do modal de editar
  static buttonEditModal = document.querySelector("#btn-saveChangesProfile"); //botao de editar form dentro do modal
  static buttonDelete = document.querySelector("#btn-delete"); //botao de deletar habito dentro do modal
  static buttonComplete = document.querySelector("#completeButton"); //query selectoe do botao de concluidos
  static buttonAll = document.querySelector("buttonAll"); //query selector do botao de todos
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
      console.log(newObject);
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
      console.log("4444444444444444");
      const descData = [...this.editForm.elements];
      console.log(descData);
      const newObject = {
        title: descData[0].value,
        description: descData[1].value,
        category: descData[2].value,
      };
      const idPost = localStorage.getItem("@capstone-m2:idPost");
      console.log(idPost);

      await Api.updateHabit(idPost, newObject);
      location.reload();
      alert("atividade editada");
      this.modalEdit.classList.add("display_none");
    });
  }
  static async deleteHabits() {
    this.buttonDelete.addEventListener("click", async (e) => {
      const idPost = localStorage.getItem("@capstone-m2:idPost");
      console.log(idPost);
      this.modalEdit.classList.add("display_none");
      // this.modalDelete.classList.remove('display_none')
      await Api.deleteHabit(idPost);
      location.reload();
    });
  }
  static async listHabits() {
    const response = await Api.readHabits();
    console.log(response);
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
          console.log(e.habit_id);
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
