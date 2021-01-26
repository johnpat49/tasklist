//Define UI Vars
const newTaskForm = document.querySelector('#task-form');
const taksList = document.querySelector('.collection');
const clearTasks = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const input = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {

    document.addEventListener('DOMContentLoaded', getTasks);
    newTaskForm.addEventListener('submit', addTask);
    taksList.addEventListener('click', deleteTask);
    clearTasks.addEventListener('click', removeAll);
    filter.addEventListener('keyup', filterEvents);
}

function getTasks() {

    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }


    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        //Create text Node and append to li
        li.appendChild(document.createTextNode(task));

        //Create new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"> </i>'
        li.appendChild(link);

        taksList.appendChild(li);
    });


}


function addTask(e) {

    if (input.value === '') {
        alert('Please input a task');
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    //Create text Node and append to li
    li.appendChild(document.createTextNode(input.value));

    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"> </i>'
    li.appendChild(link);

    taksList.appendChild(li);


    storeTaskInLocalStorage(input.value);

    input.value = '';

    e.preventDefault();
}


function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function deleteTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        // taksList.removeChild(e.target.parentElement.parentElement);
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}


function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }


    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            console.log('in');
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}


function removeAll() {

    while (taksList.firstChild) {
        taksList.removeChild(taksList.firstChild);
    }

    clearTasksFromLocalStorage();



}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}



function filterEvents(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }

    });


}