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
    deleteTaskWith(e.target.parentElement.parentElement.getAttribute("data-id"));
    e.target.parentElement.parentElement.remove();
  }
  if (e.target.classList.contains("mham")) {
    toggleStatusTaskWith(e.target.parentElement.parentElement.getAttribute("data-id"));
    e.target.parentElement.parentElement.classList.toggle("done");
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
    div.className = task.completed ? "task done" : "task";
    div.setAttribute("data-id", task.id);

    let textmain = document.createElement("div");
    textmain.className = "textmain";
    let ptwxt = document.createElement("p");
    ptwxt.className = "ptwxt";
    ptwxt.appendChild(document.createTextNode(task.title));
    textmain.appendChild(ptwxt);

    let buttons = document.createElement("div");
    buttons.className = "buttons";

    let spanDel = document.createElement("span");
    spanDel.className = "del";
    spanDel.appendChild(document.createTextNode("حذف المهمة"));

    let spanComplete = document.createElement("span");
    spanComplete.className = "mham";
    spanComplete.appendChild(document.createTextNode("تم انجاز المهمة"));

    buttons.appendChild(spanDel);
    buttons.appendChild(spanComplete);

    div.appendChild(textmain);
    div.appendChild(buttons);

    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOftasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOftasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOftasks = arrayOftasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOftasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOftasks.length; i++) {
    if (arrayOftasks[i].id == taskId) {
      arrayOftasks[i].completed = !arrayOftasks[i].completed;
    }
  }
  addDataToLocalStorageFrom(arrayOftasks);
}
