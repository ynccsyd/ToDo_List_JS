const task = document.querySelector("#task");
const taskList = document.querySelector("#list");
const ul = document.querySelector("#list");

let todos = [];

runEvents();
function runEvents() {
    document.addEventListener("DOMContentLoaded", pageLoaded);
    taskList.addEventListener("click", removeTodoToUI);
}

function newElement() {
    const todo = task.value.trim();
    if (!todo == "") {
        createTask(todo);
        addTodoToStorage(todo);
        $('.success').toast("show")
    } else {
        $('.error').toast("show")
    }
}

function createTask(todo) {
    let li = document.createElement("li");
    li.className = "todo";
    li.onclick = "tamamla()";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    let button = document.createElement("button");
    button.className = "cikar";
    button.innerText = "X";
    li.innerHTML = todo;
    li.append(button);
    taskList.append(li);
    task.value = "";
}

function removeTodoToUI(e) {
    if (e.target.className === "cikar") {
        //Ekrandan Silme
        const todo = e.target.parentElement;
        todo.remove();
        //Storage'dan Silme
        removeTodoToStorage(todo.firstChild.textContent);
    }

}

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo == todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}


function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        createTask(todo);
    });
}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


ul.addEventListener("click", tamamla);
function tamamla(e) {
    let li = e.target;
    li.classList.toggle("checked");
}