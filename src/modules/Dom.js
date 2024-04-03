import ProjectManager from "./ProjectManager.js";
import deleteIcon from "../images/delete.svg";

const _projectManager = new ProjectManager();
const page = document.getElementById("page-container");
const addProjectDialog = document.getElementById("add-project-dialog");
const addTodoDialog = document.getElementById("add-todo-dialog");
const projectList = document.getElementById("project-list");
const todoList = document.getElementById("todo-list");
const addProjectButton = document.getElementById("add-project-button")
const addTodoButton = document.getElementById("add-todo-button");

const deleteImage = new Image();
deleteImage.src = deleteIcon;

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
                <input id="input-todo-due" name="input-todo-due" type="text">
            </div>
            <div>
                <label for="input-todo-priority">Priority:</label>
                <input id="input-todo-priority" name="input-todo-priority" type="text">
            </div>
        </div>
    <button id="submit-add-todo" type="submit">Add project</button>
    <button id="cancel-add-todo" type="reset">Cancel</button>
    </form>`;
}

function createProjectListItem(project) {
    const projectItem = document.createElement("li");
    projectItem.textContent = project.name;
    projectItem.addEventListener("click", () => renderProjectTodos(project));

    projectItem.appendChild(deleteImage);
    
    projectList.appendChild(projectItem);
    renderProjectTodos(project);
}

function renderProjectTodos(project) {
    todoList.innerHTML = "";
    project.todoList.forEach((todo) => {
        const todoItem = document.createElement("li");
        todoItem.textContent = `${todo.title}: ${todo.description}`
        todoList.appendChild(todoItem);
    });

    document.getElementById("add-todo-form").onsubmit = () => addTodoToProject(project);
}

function addProject() {
    event.preventDefault();
    addProjectDialog.close();
    let name = document.getElementById("input-project-name").value;
    let description = document.getElementById("input-project-description").value;
    _projectManager.addProject(name, description);
    document.getElementById("add-project-form").reset();

    createProjectListItem(_projectManager.projectList[_projectManager.projectList.length - 1]);
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

function renderPage() {
    createAddProjectDialog();
    createAddTodoDialog();

    addProjectDialog.addEventListener("submit", addProject);
    addProjectButton.addEventListener("click", () => addProjectDialog.showModal());
    addTodoButton.addEventListener("click", () => addTodoDialog.showModal());

    const closeAddProjectDialog = document.getElementById("cancel-add-project");
    const closeAddTodoDialog = document.getElementById("cancel-add-todo");
    closeAddProjectDialog.addEventListener("click", () => addProjectDialog.close());
    closeAddTodoDialog.addEventListener("click", () => addTodoDialog.close());
}

export default renderPage;