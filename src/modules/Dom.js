import ProjectManager from "./ProjectManager.js";
import deleteIcon from "../images/delete.svg";
import {format, differenceInCalendarDays} from "date-fns";

const _projectManager = new ProjectManager();
const page = document.getElementById("page-container");
const addProjectDialog = document.getElementById("add-project-dialog");
const addTodoDialog = document.getElementById("add-todo-dialog");
const editTodoDialog = document.getElementById("edit-todo-dialog");
const projectList = document.getElementById("project-list");
const todoList = document.getElementById("todo-list");
const addProjectButton = document.getElementById("add-project-button")
const addTodoButton = document.getElementById("add-todo-button");
const projectTitle = document.getElementById("project-title");

function createAddProjectDialog() {
    addProjectDialog.innerHTML = `
    <form id="add-project-form">
        <div>
            <p>Create a new project</p>
            <div>
                <label for="input-project-name">Name:</label>
                <input id="input-project-name" name="input-project-name" type="text" required>
            </div>
            <div>
                <label for="input-project-description">Description:</label>
                <input id="input-project-description" name="input-project-description" type="textarea">
            </div>
        </div>
    <button id="submit-add-project" type="submit">Add project</button>
    <button id="cancel-add-project" type="reset">Cancel</button>
    </form>`;
}

function createAddTodoDialog() {
    addTodoDialog.innerHTML = `
    <form id="add-todo-form">
        <div>
            <p>Add a todo</p>
            <div>
                <label for="input-todo-title">Title:</label>
                <input id="input-todo-title" name="input-todo-title" type="text" required>
            </div>
            <div>
                <label for="input-todo-description">Description:</label>
                <input id="input-todo-description" name="input-todo-description" type="textarea">
            </div>
            <div>
                <label for="input-todo-due">Due date:</label>
                <input id="input-todo-due" name="input-todo-due" type="date" required>
            </div>
            <div>
                <label for="input-todo-priority">Priority (1-5):</label>
                <input id="input-todo-priority" name="input-todo-priority" type="number" min="1" max="5" value="3">
            </div>
        </div>
    <button id="submit-add-todo" type="submit">Add todo</button>
    <button id="cancel-add-todo" type="reset">Cancel</button>
    </form>`;
}

function createEditTodoDialog() {
    editTodoDialog.innerHTML = `
    <form id="edit-todo-form">
        <div>
            <p>Edit a todo</p>
            <div>
                <label for="edit-todo-title">Title:</label>
                <input id="edit-todo-title" name="edit-todo-title" type="text" required>
            </div>
            <div>
                <label for="edit-todo-description">Description:</label>
                <input id="edit-todo-description" name="edit-todo-description" type="textarea">
            </div>
            <div>
                <label for="edit-todo-due">Due date:</label>
                <input id="edit-todo-due" name="edit-todo-due" type="date" required>
            </div>
            <div>
                <label for="edit-todo-priority">Priority (1-5):</label>
                <input id="edit-todo-priority" name="edit-todo-priority" type="number" min="1" max="5">
            </div>
        </div>
    <button id="submit-edit-todo" type="submit">Edit todo</button>
    <button id="cancel-edit-todo" type="reset">Cancel</button>
    </form>`;
}

function createProjectListItem(project) {
    const projectItem = document.createElement("li");
    projectList.appendChild(projectItem);
    highlightSelected(projectItem);
    projectItem.addEventListener("click", () => {
        renderProjectTodos(project)
        highlightSelected(projectItem);
    });

    const projectItemName = document.createElement("span");
    projectItemName.textContent = project.name;
    projectItem.appendChild(projectItemName);

    const deleteImage = new Image();
    deleteImage.src = deleteIcon;
    deleteImage.addEventListener("click", () => deleteProject(project, projectItem));
    projectItem.appendChild(deleteImage);
}

function renderInitialProjectList() {
    _projectManager.projectList.forEach((project) => createProjectListItem(project));
}

function renderProjectTodos(project) {
    projectTitle.textContent = `${project.name}: ${project.description}`;
    todoList.innerHTML = "";
    addTodoButton.style.visibility = "visible";

    // const todoSectionBar = document.createElement("div");
    // todoSectionBar.id = "todo-section-bar"
    // const finishedHead = document.createElement("div");
    // finishedHead.textContent = "Finished";
    // const titleHead = document.createElement("div");
    // titleHead.textContent = "Title";
    // const descriptionHead = document.createElement("div");
    // descriptionHead.textContent = "Description";
    // const dueDateHead = document.createElement("div");
    // dueDateHead.textContent = "Due Date";
    // const priorityHead = document.createElement("div");
    // priorityHead.textContent = "Priority";
    // todoSectionBar.append(finishedHead, titleHead, descriptionHead, dueDateHead, priorityHead);
    // todoList.appendChild(todoSectionBar);
    todoList.appendChild(buildTodoSectionBar());

    todoList.appendChild(document.createElement("hr"));

    project.todoList.forEach((todo) => {
        const todoItem = buildTodoItem(project, todo);
        if (todo.isFinished) {
            todoItem.classList.add("finished");
        }
        highlightUrgency(todo, todoItem.getElementsByClassName("item-due-date")[0]);
        todoList.appendChild(todoItem);
    });

    document.getElementById("add-todo-form").onsubmit = () => addTodoToProject(project);
}

function buildTodoSectionBar() {
    const todoSectionBar = document.createElement("div");
    todoSectionBar.id = "todo-section-bar"
    const finishedHead = document.createElement("div");
    finishedHead.textContent = "Finished";
    const titleHead = document.createElement("div");
    titleHead.textContent = "Title";
    const descriptionHead = document.createElement("div");
    descriptionHead.textContent = "Description";
    const dueDateHead = document.createElement("div");
    dueDateHead.textContent = "Due Date";
    const priorityHead = document.createElement("div");
    priorityHead.textContent = "Priority";
    todoSectionBar.append(finishedHead, titleHead, descriptionHead, dueDateHead, priorityHead);

    todoSectionBar.querySelectorAll(":scope > *").forEach((child) => {
        child.addEventListener("click", () => {
            highlightSelected(child);
        });
    });

    return todoSectionBar;
}

function buildTodoItem(project, todo) {
    const todoItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", () => toggleTodoFinished(todo));
    checkbox.checked = todo.isFinished;
    
    const todoTitle = document.createElement("div");
    todoTitle.textContent = todo.title;
    todoTitle.classList.add("item-title");
    const todoDescription = document.createElement("div");
    todoDescription.textContent = todo.description;
    todoDescription.classList.add("item-description");
    const todoDueDate = document.createElement("div");
    let dateSplit = todo.dueDate.split("-");
    todoDueDate.textContent = `Due: ${format(new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]), "MMMM dd, yyyy")}`;
    todoDueDate.classList.add("item-due-date");
    const todoPriority = document.createElement("div");
    todoPriority.textContent = `Priority: ${todo.priority}`;
    todoPriority.classList.add("item-priority");

    const deleteImage = new Image();
    deleteImage.src = deleteIcon;
    deleteImage.addEventListener("click", () => deleteTodo(project, todo, todoItem));

    todoItem.append(checkbox, todoTitle, todoDescription, todoDueDate, todoPriority, deleteImage);
    todoItem.addEventListener("click", () => fillEditForm(todo, todoItem));

    return todoItem;
}

function addProject() {
    event.preventDefault();
    addProjectDialog.close();
    let name = document.getElementById("input-project-name").value;
    let description = document.getElementById("input-project-description").value;
    _projectManager.addProject(name, description);
    document.getElementById("add-project-form").reset();

    let newProject = _projectManager.projectList[_projectManager.projectList.length - 1];
    createProjectListItem(newProject);
    renderProjectTodos(newProject);
}

function addTodoToProject(project) {
    event.preventDefault();
    console.log(`Testing submitting new todo, project id: ${project.id}`);
    addTodoDialog.close();

    let title = document.getElementById("input-todo-title").value;
    let description = document.getElementById("input-todo-description").value;
    let dueDate = document.getElementById("input-todo-due").value;
    let priority = document.getElementById("input-todo-priority").value;
    document.getElementById("add-todo-form").reset();

    _projectManager.addTodoToProject(project.id, title, description, dueDate, priority);
    renderProjectTodos(project);
}

function deleteProject(project, projectListItem) {
    event.stopPropagation();
    _projectManager.deleteProject(project);
    projectListItem.remove();

    todoList.innerHTML = "Select a project on the left to get started";
    addTodoButton.style.visibility = "hidden";
    projectTitle.textContent = "";
}

function deleteTodo(project, todo, todoListItem) {
    event.stopPropagation();
    _projectManager.deleteTodo(project, todo);
    todoListItem.remove();
}

function editTodo(todo, todoItem) {
    event.preventDefault();
    editTodoDialog.close();
    let title = document.getElementById("edit-todo-title").value;
    let description = document.getElementById("edit-todo-description").value;
    let dueDate = document.getElementById("edit-todo-due").value;
    let priority = document.getElementById("edit-todo-priority").value;

    _projectManager.editTodo(todo, title, description, dueDate, priority);

    todoItem.getElementsByClassName("item-title")[0].textContent = todo.title;
    todoItem.getElementsByClassName("item-description")[0].textContent = todo.description;
    const dateSplit = todo.dueDate.split("-");
    todoItem.getElementsByClassName("item-due-date")[0].textContent = `Due: ${format(new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]), "MMMM dd, yyyy")}`
    todoItem.getElementsByClassName("item-priority")[0].textContent = `Priority: ${todo.priority}`;

    highlightUrgency(todo, todoItem.getElementsByClassName("item-due-date")[0]);
}

function fillEditForm(todo, todoItem) {
    document.getElementById("edit-todo-title").value = todo.title;
    document.getElementById("edit-todo-description").value = todo.description;
    document.getElementById("edit-todo-due").value = todo.dueDate;
    document.getElementById("edit-todo-priority").value = todo.priority;

    document.getElementById("edit-todo-form").onsubmit = () => editTodo(todo, todoItem);
    
    editTodoDialog.showModal();
}

function highlightSelected(selected) {
    const childNodes = selected.parentNode.querySelectorAll(":scope > *");
    childNodes.forEach((child) => {
        child.classList.remove("selected");
    });
    selected.classList.add("selected");

    // const projectListItems = document.querySelectorAll("#project-list li");
    // projectListItems.forEach((item) => {
    //     item.classList.remove("selected");
    // })

    // selected.classList.add("selected");
}

function toggleTodoFinished(todo) {
    event.stopPropagation();
    _projectManager.toggleTodoFinished(todo, event.target.checked);

    if (todo.isFinished) {
        event.target.parentNode.classList.add("finished");
    }
    else {
        event.target.parentNode.classList.remove("finished");
    }
}

function highlightUrgency(todo, container) {
    let difference = differenceInCalendarDays(todo.dueDate, new Date()) + 1;
    if (difference <= 0) {
        container.classList.add("due");
    }
    else if (difference <= 7) {
        container.classList.add("urgent");
    }
    else if (difference <= 14) {
        container.classList.add("upcoming");
    }
    else {
        container.classList.remove("due");
        container.classList.remove("urgent");
        container.classList.remove("upcoming");
    }
}

function renderPage() {
    createAddProjectDialog();
    createAddTodoDialog();
    createEditTodoDialog();
    renderInitialProjectList();

    addProjectDialog.addEventListener("submit", addProject);
    addProjectButton.addEventListener("click", () => addProjectDialog.showModal());
    addTodoButton.addEventListener("click", () => addTodoDialog.showModal());

    const closeAddProjectDialog = document.getElementById("cancel-add-project");
    const closeAddTodoDialog = document.getElementById("cancel-add-todo");
    const closeEditTodoDialog = document.getElementById("cancel-edit-todo");
    closeAddProjectDialog.addEventListener("click", () => addProjectDialog.close());
    closeAddTodoDialog.addEventListener("click", () => addTodoDialog.close());
    closeEditTodoDialog.addEventListener("click", () => editTodoDialog.close());

    addTodoButton.style.visibility = "hidden";
    todoList.innerHTML = "Select a project on the left to get started";

    const projectListItems = document.querySelectorAll("#project-list li");
    projectListItems.forEach((item) => {
        item.classList.remove("selected");
    })
}

export default renderPage;