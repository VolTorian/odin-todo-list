import ProjectManager from "./ProjectManager.js";

const page = document.getElementById("page-container");
const addProjectDialog = document.getElementById("add-project-dialog");

function createAddProjectDialog() {
    addProjectDialog.innerHTML = `
    <form id="add-project-form">
        <div>
            <p id="dialog-header">Create a new project</p>
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

function renderPage() {
    createAddProjectDialog();
    const closeAddProjectDialog = document.getElementById("cancel-add-project");
    closeAddProjectDialog.addEventListener("click", () => addProjectDialog.close());
    addProjectDialog.addEventListener("submit", addProject);

    const _projectManager = new ProjectManager();
    
    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "Add new project";
    addProjectButton.addEventListener("click", () => document.getElementById("add-project-dialog").showModal());
    page.appendChild(addProjectButton);

    const addTodoButton = document.createElement("button");
    addTodoButton.textContent = "Add todo to project";
    addTodoButton.addEventListener("click", addTodoToProject);
    page.appendChild(addTodoButton);
    
    function addProject() {
        event.preventDefault();
        addProjectDialog.close();
        let name = document.getElementById("input-project-name").value;
        let description = document.getElementById("input-project-description").value;
        _projectManager.addProject(name, description);
        document.getElementById("add-project-form").reset();
    }

    function addTodoToProject() {
        let projectID = prompt("Enter the ID of the project you wish to add a todo to:");
        let description = prompt("Enter a description for the todo:", "Todo description");
        let dueDate = prompt("Enter a due date:");
        let priority = prompt("Enter a priorit (1-5):", "3");
        _projectManager.addTodoToProject(projectID, description, dueDate, priority);
    }

}

export default renderPage;