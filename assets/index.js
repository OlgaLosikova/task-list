const taskForm = document.forms.taskForm;
const input = taskForm.elements.taskFormInput;
const taskList = document.querySelector("#taskList");
const addButton = taskForm.elements.addButton;
const removeButton = taskForm.elements.removeButton;
const taskArray = [];
const taskListJSON = window.localStorage.getItem("taskArray");
const showTask = () => {
  if (taskListJSON !== "[]") {
    const taskArray = JSON.parse(taskListJSON);
    for (const key in taskArray) {
      taskList.innerHTML += `<p style="display: inline;">${taskArray[key]}</p><input type='checkbox'>`;
    }
    document.querySelector("#emptyList").style.display = "none";
    removeButton.disabled = false;
  } else console.log("Массива taskArray нет в локальном хранилище");
};
showTask();
addButton.onclick = () => {
  if (input.value !== "") {
    document.querySelector("#emptyList").style.display = "none";
    const taskText = document.createElement("p");
    taskText.textContent = input.value;
    taskText.style.display = "inline";
    const taskInput = document.createElement("input");
    taskInput.type = "checkbox";
    taskList.append(taskText);
    taskList.append(taskInput);
    taskList.style.color = "black";
    removeButton.disabled = false;

    //Добавление в локальное хранилище
    taskArray.push(input.value);
    console.log(taskArray);
    window.localStorage.setItem("taskArray", JSON.stringify(taskArray));

    input.value = "";
  } else console.log("Введите текст задачи");
};
removeButton.onclick = () => {
  if (taskListJSON) {
    let taskArray = JSON.parse(taskListJSON);
    taskArray = [];
    window.localStorage.setItem("taskArray", JSON.stringify(taskArray));

    taskList.innerHTML = "";

    document.querySelector("#emptyList").style.display = "block";
    removeButton.disabled = true;
  } else console.log("Массива taskArray нет в локальном хранилище");
};
