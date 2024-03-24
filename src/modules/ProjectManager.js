import Project from './Project.js';
import Todo from './Todo.js';

class ProjectManager {
    constructor() {
        this.projectList = [];
    }

    addProject(name, description, todoList = []) {
        this.projectList.push(new Project(name, description, todoList));
    }

    addTodoToProject(projectId, title, description, dueDate, priority, isFinished = false) {
        let projectIndex = -1;
        for (let i = 0; i < this.projectList.length; i++) {
            if (this.projectList[i].id === projectId) {
                projectIndex = i;
                break;
            }
        }
        if (projectIndex === -1) {
            console.log("O.o project not found wat");
            return;
        }
        this.projectList[projectIndex].todoList.push(new Todo(title, description, dueDate, priority, isFinished));
    }
}

export default ProjectManager;