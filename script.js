document.addEventListener('DOMContentLoaded', loadTasks);

const addTaskButton = document.getElementById('add-task-button');
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', addTask);
taskList.addEventListener('click', modifyTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => displayTask(task));
}

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        const task = {
            text: taskText,
            completed: false
        };
        displayTask(task);
        saveTask(task);
        newTaskInput.value = '';
    }
}

function displayTask(task) {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;
    if (task.completed) {
        taskItem.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
}

function modifyTask(e) {
    const taskItem = e.target.closest('li');
    if (e.target.tagName === 'BUTTON') {
        deleteTask(taskItem);
    } else {
        toggleCompletion(taskItem);
    }
}

function deleteTask(taskItem) {
    taskItem.remove();
    updateLocalStorage();
}

function toggleCompletion(taskItem) {
    taskItem.classList.toggle('completed');
    updateLocalStorage();
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
        tasks.push({
            text: taskItem.firstChild.textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
