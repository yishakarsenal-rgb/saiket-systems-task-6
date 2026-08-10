document.addEventListener("DOMContentLoaded", () => {
  // INITIAL SEED TASKS
  const initialTasks = [
    {
      id: "1",
      title: "Setup Task 6 SPA Repository on GitHub",
      priority: "high",
      status: "completed",
      tag: "Git",
    },
    {
      id: "2",
      title: "Build Interactive DOM Kanban Board UI",
      priority: "high",
      status: "in-progress",
      tag: "Frontend",
    },
    {
      id: "3",
      title: "Deploy Live Application to Vercel Platform",
      priority: "medium",
      status: "todo",
      tag: "Vercel",
    },
    {
      id: "4",
      title: "Prepare LinkedIn Task 6 Showcase Recording",
      priority: "low",
      status: "todo",
      tag: "Career",
    },
  ];

  // DOM ELEMENTS
  const listTodo = document.getElementById("listTodo");
  const listInProgress = document.getElementById("listInProgress");
  const listCompleted = document.getElementById("listCompleted");

  const statTotal = document.getElementById("statTotal");
  const statCompleted = document.getElementById("statCompleted");
  const statProgress = document.getElementById("statProgress");
  const progressBarFill = document.getElementById("progressBarFill");

  const countTodo = document.getElementById("countTodo");
  const countInProgress = document.getElementById("countInProgress");
  const countCompleted = document.getElementById("countCompleted");

  const searchInput = document.getElementById("searchInput");
  const priorityFilter = document.getElementById("priorityFilter");

  const taskModal = document.getElementById("taskModal");
  const openTaskModalBtn = document.getElementById("openTaskModalBtn");
  const closeTaskModalBtn = document.getElementById("closeTaskModalBtn");
  const cancelTaskBtn = document.getElementById("cancelTaskBtn");
  const taskForm = document.getElementById("taskForm");

  // LOCAL STORAGE HANDLERS
  function getTasks() {
    const stored = localStorage.getItem("devpulse_tasks");
    if (!stored) {
      localStorage.setItem("devpulse_tasks", JSON.stringify(initialTasks));
      return initialTasks;
    }
    return JSON.parse(stored);
  }

  function saveTasks(tasks) {
    localStorage.setItem("devpulse_tasks", JSON.stringify(tasks));
  }

  // RENDER BOARD & UPDATE METRICS
  function renderBoard() {
    const tasks = getTasks();
    const searchTerm = searchInput.value.toLowerCase();
    const selectedPriority = priorityFilter.value;

    // Filter logic
    const filtered = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm) ||
        (task.tag && task.tag.toLowerCase().includes(searchTerm));
      const matchesPriority =
        selectedPriority === "all" || task.priority === selectedPriority;
      return matchesSearch && matchesPriority;
    });

    // Clear Lists
    listTodo.innerHTML = "";
    listInProgress.innerHTML = "";
    listCompleted.innerHTML = "";

    let counts = { todo: 0, "in-progress": 0, completed: 0 };

    filtered.forEach((task) => {
      counts[task.status]++;
      const card = document.createElement("div");
      card.className = "task-card";
      card.innerHTML = `
        <div class="task-card-header">
          <span class="priority-tag priority-${task.priority}">${task.priority}</span>
          <span style="font-size:0.75rem; color:var(--text-muted);">${task.tag ? "#" + task.tag : ""}</span>
        </div>
        <h4>${task.title}</h4>
        <div class="task-card-footer">
          <div class="task-actions">
            ${task.status !== "todo" ? `<button class="btn-icon" onclick="moveTask('${task.id}', 'prev')" title="Move Back">⬅️</button>` : ""}
            ${task.status !== "completed" ? `<button class="btn-icon" onclick="moveTask('${task.id}', 'next')" title="Move Forward">➡️</button>` : ""}
          </div>
          <div class="task-actions">
            <button class="btn-icon" onclick="editTask('${task.id}')" title="Edit">✏️</button>
            <button class="btn-icon" onclick="deleteTask('${task.id}')" title="Delete">🗑️</button>
          </div>
        </div>
      `;

      if (task.status === "todo") listTodo.appendChild(card);
      else if (task.status === "in-progress") listInProgress.appendChild(card);
      else if (task.status === "completed") listCompleted.appendChild(card);
    });

    // Update Counts & Analytics
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    statTotal.textContent = total;
    statCompleted.textContent = completed;
    statProgress.textContent = `${percentage}%`;
    progressBarFill.style.width = `${percentage}%`;

    countTodo.textContent = counts.todo;
    countInProgress.textContent = counts["in-progress"];
    countCompleted.textContent = counts.completed;
  }

  // MOVE TASK STATUS
  window.moveTask = function (id, direction) {
    let tasks = getTasks();
    const statusFlow = ["todo", "in-progress", "completed"];

    tasks = tasks.map((t) => {
      if (t.id === id) {
        let currentIndex = statusFlow.indexOf(t.status);
        let nextIndex =
          direction === "next" ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex >= 0 && nextIndex < statusFlow.length) {
          t.status = statusFlow[nextIndex];
        }
      }
      return t;
    });

    saveTasks(tasks);
    renderBoard();
  };

  // EDIT TASK
  window.editTask = function (id) {
    const tasks = getTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    document.getElementById("taskId").value = task.id;
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskPriority").value = task.priority;
    document.getElementById("taskStatus").value = task.status;
    document.getElementById("taskTag").value = task.tag || "";

    document.getElementById("modalTitle").textContent = "Edit Task";
    taskModal.classList.add("active");
  };

  // DELETE TASK
  window.deleteTask = function (id) {
    if (confirm("Delete this task?")) {
      let tasks = getTasks();
      tasks = tasks.filter((t) => t.id !== id);
      saveTasks(tasks);
      renderBoard();
    }
  };

  // FORM SUBMISSION
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("taskId").value;
    const title = document.getElementById("taskTitle").value;
    const priority = document.getElementById("taskPriority").value;
    const status = document.getElementById("taskStatus").value;
    const tag = document.getElementById("taskTag").value;

    let tasks = getTasks();

    if (id) {
      tasks = tasks.map((t) =>
        t.id === id ? { ...t, title, priority, status, tag } : t,
      );
    } else {
      tasks.unshift({
        id: Date.now().toString(),
        title,
        priority,
        status,
        tag,
      });
    }

    saveTasks(tasks);
    taskModal.classList.remove("active");
    renderBoard();
  });

  // MODAL TOGGLES
  openTaskModalBtn.addEventListener("click", () => {
    taskForm.reset();
    document.getElementById("taskId").value = "";
    document.getElementById("modalTitle").textContent = "Create New Task";
    taskModal.classList.add("active");
  });

  const closeModal = () => taskModal.classList.remove("active");
  closeTaskModalBtn.addEventListener("click", closeModal);
  cancelTaskBtn.addEventListener("click", closeModal);

  // SEARCH & FILTER LISTENERS
  searchInput.addEventListener("input", renderBoard);
  priorityFilter.addEventListener("change", renderBoard);

  // FOCUS POMODORO TIMER LOGIC
  let timerInterval = null;
  let timeLeft = 25 * 60;

  const timerDisplay = document.getElementById("timerDisplay");
  const timerStartBtn = document.getElementById("timerStartBtn");
  const timerPauseBtn = document.getElementById("timerPauseBtn");
  const timerResetBtn = document.getElementById("timerResetBtn");

  function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerDisplay.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  timerStartBtn.addEventListener("click", () => {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        alert("Focus Session Complete!");
      }
    }, 1000);
  });

  timerPauseBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
  });

  timerResetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;
    updateTimerDisplay();
  });

  // THEME TOGGLE LOGIC
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const currentTheme = localStorage.getItem("devpulse_theme") || "dark";

  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
  }

  themeToggleBtn.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    if (activeTheme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("devpulse_theme", "dark");
      themeToggleBtn.textContent = "🌙";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("devpulse_theme", "light");
      themeToggleBtn.textContent = "☀️";
    }
  });

  // INITIAL RENDER
  renderBoard();
  updateTimerDisplay();
});
