let tasks = [];
let taskId = 1;
let editingTaskId = null;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        id: taskId++,
        text: taskText,
        completed: false
    };
    tasks.push(task);
    updateTaskList();
    taskInput.value = "";
}

function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add("task-item");

        // Uso de crases `` para permitir ${...}
        const taskContent = editingTaskId === task.id 
            ? `<input type="text" id="editingTaskInput" value="${task.text}">` 
            : `<span class="${task.completed ? "completed-task" : ""}">${task.text}</span>`;
        
        const editIcon = editingTaskId === task.id ? "&#10004;" : "&#9998;";
        const completionIcon = task.completed ? "&#10060;" : "&#10004;";

        // O HTML vai no taskItem, e não direto na taskList
        taskItem.innerHTML = `
            ${taskContent}
            <span>
                <button onclick="editTask(${task.id})">${editIcon}</button>
                <button onclick="deleteTask(${task.id})">&#128465;</button>
                <button onclick="toggleTaskCompletion(${task.id})">${completionIcon}</button>
            </span>
        `;
        taskList.appendChild(taskItem);
    });

    updateProgress();
}

// Alternar entre modo de edição e salvar
function editTask(id) {
    if (editingTaskId === id) {
        const input = document.getElementById('editingTaskInput');
        if (input) {
            const task = tasks.find(t => t.id === id);
            if (task) task.text = input.value.trim() || task.text;
        }
        editingTaskId = null;
    } else {
        editingTaskId = id;
    }
    updateTaskList();
}

// Deletar tarefa
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    if (editingTaskId === id) editingTaskId = null;
    updateTaskList();
}

// Alternar conclusão
function toggleTaskCompletion(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
    }
    updateTaskList();
}

// Atualizar barra de progresso
function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;

    if (tasks.length === 0) {
        progressBar.style.width = '0%';
        return;
    }

    const completedTasks = tasks.filter(task => task.completed).length;
    const percentage = (completedTasks / tasks.length) * 100;
    progressBar.style.width = `${percentage}%`;
}