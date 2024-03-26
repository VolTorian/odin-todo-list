import Project from './Project.js';
import Todo from './Todo.js';

class ProjectManager {
    constructor() {
        this.projectList = [];
    }

    addProject(name, description, todoList = []) {
        this.projectList.push(new Project(name, description, todoList));

        console.log("Test, newly added project:");
        console.log(this.projectList[this.projectList.length - 1]);
    }

    addTodoToProject(projectId, title, description, dueDate, priority, isFinished = false) {
        let selectedProject = this.projectList.find((project) => project.id === projectId);

        if (selectedProject === undefined) {
            console.log("O.o project not found wat");
            return;
        }

        selectedProject.addTodo(new Todo(title, description, dueDate, priority, isFinished));
    }
}

export default ProjectManager;