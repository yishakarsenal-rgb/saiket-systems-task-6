# DevPulse — Interactive Task & Sprint Dashboard

DevPulse is a real-time, interactive single-page web application (SPA) designed as an Agile Task & Focus Command Center. Built with vanilla HTML, CSS, and JavaScript, it features dynamic DOM updates, task lifecycle tracking across a Kanban board, real-time analytics, and a built-in Pomodoro focus timer.

Project Context: Created for the Saiket Systems Internship Task 6.

## Key Features

- Interactive Kanban Board: Organize tasks effortlessly across three lifecycle stages: To Do, In Progress, and Completed.
- Full CRUD Operations: Create new tasks, edit existing task details, move tasks forward/backward across columns, and delete tasks with instant DOM updates.
- Real-Time Analytics & Metrics: Automatically tracks Total Tasks, Completed Tasks, and calculates the overall Completion Rate with a dynamic visual progress bar.
- ** Built-in Focus Pomodoro Timer:** Integrated 25-minute work session timer with _Start_, _Pause_, and _Reset_ controls to boost productivity directly within the dashboard.
- **Instant Search & Filtering:** Filter tasks in real-time by title, `#tag`, or priority level (_High_, _Medium_, _Low_).
- **Dark & Light Mode:** Seamless theme toggling with user preference saved automatically.
- **Persistent Local Storage:** All tasks and theme states are stored in the browser's `localStorage`, ensuring no data is lost on page reload.
- **Responsive Design:** Clean, modern UI built with CSS Grid and Flexbox that adapts smoothly to desktop, tablet, and mobile screens.

---

## Tech Stack

- **HTML5:** Semantic structure, accessible forms, and modal dialogs.
- **CSS3:** Custom CSS variables (`:root`) for theming, CSS Grid, Flexbox, backdrop filters, and smooth micro-interactions.
- **Vanilla JavaScript (ES6+):** Dynamic DOM manipulation, event handling, state management via `localStorage`, and timer intervals.

---

## Usage Guide

1. **Adding a Task:** Click the **+ New Task** button in the top navigation bar, fill in the title, priority, initial status, and category tag, then click **Save Task**.
2. **Moving Tasks:** Use the `⬅️` and `➡️` arrow buttons on any task card to transition it between _To Do_, _In Progress_, and _Completed_.
3. **Editing / Deleting:** Click the `✏️` icon on a task card to modify its details, or the `🗑️` icon to remove it from the board.
4. **Using the Pomodoro Timer:** Use the **Start**, **Pause**, and **Reset** buttons in the Focus Pomodoro card to manage 25-minute deep work sprints.
5. **Switching Themes:** Click the `🌙` / `☀️` button in the navigation bar to toggle between Dark and Light modes.

---

## Author

**Yishak Mekuannent**

```

```
