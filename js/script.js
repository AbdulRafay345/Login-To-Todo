let users = [];
let todos = [];
const getInputFieldValue = id => document.getElementById(id).value;

function randomId() {
    let randomId = "";
    let limit = 8
    let possibleId = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    for (let i = 0; i <= limit; i++) {
        let randomNumber = Math.random()
        randomId += possibleId.charAt(Math.floor(randomNumber * possibleId.length))
    }
    return randomId
}


function registerUsers() {
    event.preventDefault()

    let name = getInputFieldValue("registerName").trim()
    let email = getInputFieldValue("registerEmail").trim()
    let password = getInputFieldValue("registerPassword")

    if (name < 3) {
        return toastNotify("Please give your name properly", "error")
    }
    if (!email) {
        return toastNotify("Please give your email!", "error")
    }
    if (password < 8) {
        return toastNotify("your password must not be less than 8", "error")
    }
    let user = { name, email, password, id: randomId(), status: "active", createdAt: new Date() }

    let isUserFound = users.find(item => item.email === user.email)
    if (isUserFound) {
        return toastNotify("User Already exists!", "error")
    } else {
        users.push(user)
        console.log(users)
        document.getElementById("forms").style.display = "block"
        document.getElementById("login").style.display = "block"
        document.getElementById("register").style.display = "none"
        return toastNotify("User registered successfully!", "success")
    }

}

function loginUser() {
    event.preventDefault()

    let email = getInputFieldValue("loginEmail")
    let password = getInputFieldValue("loginPassword")

    if (!email) {
        return toastNotify("Please give your email!", "error")
    }
    if (password < 8) {
        return toastNotify("your password must not be less than 8", "error")
    }
    let user = { email, password }

    let isUserFound = users.find(item => item.email === user.email)
    if (!isUserFound) {
        return toastNotify("User don't exists!", "error")
    } else {
        document.getElementById("forms").style.display = "none"
        document.getElementById("login").style.display = "none"
        document.getElementById("register").style.display = "none"
        document.getElementById("todos").style.display = "block"
        document.getElementById("body").style.background = "#fff"
        document.getElementById("loggedInEmail").innerHTML = "Welcome! " + email
        return toastNotify("You logged in succesfully", "success")
    }
}



// todo functions
function createTodo() {
    event.preventDefault()
    let title = getInputFieldValue("title")
    let description = getInputFieldValue("description")
    let date = getInputFieldValue("date")

    let todo = { title, description, date, id: randomId(), status: "Incomplete" }
    let isTodoExists = todos.find(item => item.title === todo.title)

    if (isTodoExists) {
        return toastNotify("Tasks Already exists!", "error")
    } else {
        todos.push(todo)
        return toastNotify("Task added successfully!", "success")
    }
}
function readTodo() {
    console.log(todos)
}

function updateTodo() {
    if (!todos.length) {
        return toastNotify("No Task exists", "error");
    }
    let indexToUpdate = parseInt(prompt("Please enter the index of the task to be updated") - 1);
    if (isNaN(indexToUpdate) || indexToUpdate < 0 || indexToUpdate >= todos.length) {
        return toastNotify("Invalid index", "error");
    }
    todos[indexToUpdate].status = "completed";
    toastNotify("Task updated", "success");
}

function deleteTodo() {
    let indexToDelete = parseInt(prompt("Please enter the index of the task to be removed") - 1);
    if (isNaN(indexToDelete) || indexToDelete < 0 || indexToDelete >= todos.length) {
        toastNotify("Invalid index", "error");
        return;
    }
    todos.splice(indexToDelete, 1);
    toastNotify("Task removed", "success");
}



function showTable() {

    if (!todos.length) {
        document.getElementById("table").innerHTML = ""
        return toastNotify("No task Found!", "error")
    }

    let tableStart = '<div class="table-responsive"><table class="table table-striped-columns mt-2 border border-dark">'
    let tableEnd = '</table></div>'
    let tableHead = '<thead><tr><th scope="col">#</th><th scope="col">Title</th><th scope="col">Description</th><th scope="col">Date</th><th scope="col">Status</th><th scope="col">ID</th></tr></thead>'
    let tableBody = ""
    for (let i = 0; i < todos.length; i++) {
        tableBody += ' <tbody><tr><th scope="row">' + (i + 1) + '</th><td>' + todos[i].title + '</td><td>' + todos[i].description + '</td><td>' + todos[i].date + '</td><td>' + todos[i].status + '</td><td>' + randomId() + '</td></tr>'
    }

    let table = tableStart + tableHead + tableBody + tableEnd
    document.getElementById("table").innerHTML = table
}


// to show and hide register/login form
function showRegister() {
    document.getElementById("forms").style.display = "block"
    document.getElementById("login").style.display = "none"
    document.getElementById("register").style.display = "block"
}
function showLogin() {
    event.preventDefault()
    document.getElementById("forms").style.display = "block"
    document.getElementById("login").style.display = "block"
    document.getElementById("register").style.display = "none"
}

// to notify
function toastNotify(text, type) {
    let bgColor;
    switch (type) {
        case "success":
            bgColor = "green"
            break;
        case "error":
            bgColor = "red"
            break
        default:
            bgColor = "#000"
            break;
    }

    Toastify({
        text: text,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: bgColor,
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

// footer year 
function footerYear() {
    let now = new Date().getFullYear()
    document.getElementById("footerYear").innerHTML = now
}

Window.onload(
    footerYear(),
    showRegister(),
)
