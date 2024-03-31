import ProjectManager from "./ProjectManager.js";

const _projectManager = new ProjectManager();
const page = document.getElementById("page-container");
const addProjectDialog = document.getElementById("add-project-dialog");
const addTodoDialog = document.getElementById("add-todo-dialog");
addProjectDialog.addEventListener("submit", addProject);
const projectList = document.getElementById("project-list");
const todoList = document.getElementById("todo-list");

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

    projectList.appendChild(projectItem);
}

function renderProjectTodos(project) {
    todoList.innerHTML = "";
    project.todoList.forEach((todo) => {
        const todoItem = document.createElement("li");
        todoItem.textContent = `${todo.title}: ${todo.description}`
        todoList.appendChild(todoItem);
    })
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

function addTodoToProject() {
    let projectID = prompt("Enter the ID of the project you wish to add a todo to:");
    let description = prompt("Enter a description for the todo:", "Todo description");
    let dueDate = prompt("Enter a due date:");
    let priority = prompt("Enter a priorit (1-5):", "3");
    _projectManager.addTodoToProject(projectID, description, dueDate, priority);
}

function renderPage() {
    createAddProjectDialog();
    const closeAddProjectDialog = document.getElementById("cancel-add-project");
    closeAddProjectDialog.addEventListener("click", () => addProjectDialog.close());
    
    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "Add new project";
    addProjectButton.addEventListener("click", () => document.getElementById("add-project-dialog").showModal());
    page.appendChild(addProjectButton);

    const addTodoButton = document.createElement("button");
    addTodoButton.textContent = "Add todo to project";
    addTodoButton.addEventListener("click", addTodoToProject);
    page.appendChild(addTodoButton);
}

export default renderPage;