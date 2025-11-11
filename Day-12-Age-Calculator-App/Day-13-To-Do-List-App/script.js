const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);
addBtn.addEventListener("click", addTask);

// allow Enter key to add task
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${escapeHtml(taskText)}</span>
    <button class="delete-btn">Delete</button>
  `;

  li.querySelector("span").addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
  taskInput.value = "";
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${escapeHtml(task.text)}</span>
      <button class="delete-btn">Delete</button>
    `;
    if (task.completed) li.classList.add("completed");

    li.querySelector("span").addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    taskList.appendChild(li);
  });
}

// small helper to avoid injecting HTML (basic escaping)
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
