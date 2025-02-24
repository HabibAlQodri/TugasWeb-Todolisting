let todoAdd = document.getElementById("task-add");
let btnAdd = document.getElementById("btn-add");

btnAdd.addEventListener("click", function (event) {
  event.preventDefault();
  
  if (todoAdd.value == "") {
    alert("Tidak Boleh Kosong");
  } else {
    let todoList = document.getElementById("todo-list");

    let todoItem = document.createElement("li");
    todoItem.classList.add("list-group-item");

    let div = document.createElement("div");
    div.classList.add("d-flex", "justify-content-between", "align-items-center");

    let taskDiv = document.createElement("div");
    let checkbox = document.createElement("input");
    checkbox.classList.add("form-check-input", "me-2");
    checkbox.type = "checkbox";
    let taskText = document.createElement("span");
    taskText.textContent = todoAdd.value;

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskText);

    let actionDiv = document.createElement("div");

    let editBtn = document.createElement("img");
    editBtn.classList.add("icon-btn", "edit-btn");
    editBtn.src = "img/icons8-edit-50.png";
    editBtn.alt = "Edit";
    editBtn.style.marginRight = "10px";

    let deleteBtn = document.createElement("img");
    deleteBtn.classList.add("icon-btn", "trash-btn", "delete-btn");
    deleteBtn.src = "img/icons8-trash-48.png";
    deleteBtn.alt = "Hapus";

    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(deleteBtn);

    div.appendChild(taskDiv);
    div.appendChild(actionDiv);

    todoItem.appendChild(div);
    todoList.appendChild(todoItem);

    todoAdd.value = "";
    todoAdd.focus();

    checkbox.addEventListener("change", function () {
      taskText.classList.toggle("text-decoration-line-through");
    });

    deleteBtn.addEventListener("click", function () {
      let confirmDeleteModal = new bootstrap.Modal(document.getElementById('deleteModal'), {
        keyboard: false
      });
      confirmDeleteModal.show();

      let confirmDeleteHandler = function () {
        todoList.removeChild(todoItem);
        confirmDeleteModal.hide();
      };
      document.getElementById('confirm-delete').removeEventListener("click", confirmDeleteHandler);
      document.getElementById('confirm-delete').addEventListener("click", confirmDeleteHandler);
    });

    editBtn.addEventListener("click", function () {
      let editModal = new bootstrap.Modal(document.getElementById('editModal'), {
        keyboard: false
      });
      editModal.show();

      let currentText = taskText.textContent;
      document.getElementById('edit-task').value = currentText;

      let saveEditHandler = function () {
        let newText = document.getElementById('edit-task').value;
        if (newText !== "" && newText !== currentText) {
          taskText.textContent = newText;
        }
        editModal.hide();
      };
      document.getElementById('save-edited-task').removeEventListener("click", saveEditHandler); 
      document.getElementById('save-edited-task').addEventListener("click", saveEditHandler);
    });
  }
});
