let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOftasks = [];
if (localStorage.getItem("tasks")) {
  arrayOftasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorage();

submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  };
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOftasks.push(task);
  addElementsToPageFrom(arrayOftasks);
  addDataToLocalStorageFrom(arrayOftasks);
}

function addElementsToPageFrom(arrayOftasks) {
  tasksDiv.innerHTML = "";
  arrayOftasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id)
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
};

function addDataToLocalStorageFrom(arrayOftasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOftasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
};

function deleteTaskWith(taskId) {
  arrayOftasks = arrayOftasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOftasks);
}

function deleteTaskWith(taskId) {
  arrayOftasks = arrayOftasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOftasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOftasks.length; i++) {
    if (arrayOftasks[i].id == taskId) {
      arrayOftasks[i].completed == false ? (arrayOftasks[i].completed = true) : (arrayOftasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOftasks);
}