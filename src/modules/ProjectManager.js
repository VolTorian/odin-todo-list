import Project from './Project.js';

class ProjectManager {
    constructor() {
        this.projectList = [];
    }

    addProject(id, name, todoList = []) {
        this.projectList.push(new Project(id, name, todoList));
    }
}

export default ProjectManager;