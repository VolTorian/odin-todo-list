import ProjectManager from "./ProjectManager.js";

function renderPage() {
    const _projectManager = new ProjectManager();
    const page = document.getElementById("page-container");
    
    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "Add new project";
    addProjectButton.addEventListener("click", addProject);
    page.appendChild(addProjectButton);

    const addTodoButton = document.createElement("button");
    addTodoButton.textContent = "Add todo to project";
    addTodoButton.addEventListener("click", addTodoToProject);
    page.appendChild(addTodoButton);
    
    function addProject() {
        let name = prompt("Enter a project name:", "Project Name");
        let description = prompt("Enter a project description", "Some description");
        _projectManager.addProject(name, description);
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