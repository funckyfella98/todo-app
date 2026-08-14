const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(function(li) {
    const span = li.querySelector("span");
    tasks.push({
      text: span.textContent,
      completed: span.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(taskText, isCompleted) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;
  if (isCompleted) {
    span.classList.add("completed");
  }
  span.addEventListener("click", function() {
    span.classList.toggle("completed");
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.addEventListener("click", function() {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

addBtn.addEventListener("click", function() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  createTaskElement(taskText, false);
  saveTasks();
  taskInput.value = "";
});

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(function(task) {
    createTaskElement(task.text, task.completed);
  });
}

loadTasks();