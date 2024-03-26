import ProjectManager from "./ProjectManager.js";

function renderPage() {
    const _projectManager = new ProjectManager();
    const page = document.getElementById("page-container");
    
    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "Add new project";
    addProjectButton.addEventListener("click", addProject);
    page.appendChild(addProjectButton);
    
    function addProject() {
        let name = prompt("Enter a project name:", "Project Name");
        let description = prompt("Enter a project description", "Some description");
        _projectManager.addProject(name, description);
    }
}

export default renderPage;