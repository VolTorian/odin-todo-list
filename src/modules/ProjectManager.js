import Project from './Project.js';
import Todo from './Todo.js';

class ProjectManager {
    constructor() {
        this.projectList = [];

        if (localStorage.getItem(this.localStorageKey)) {
            this.projectList = JSON.parse(localStorage.getItem(this.localStorageKey));
            this.projectList.forEach((project) => {
                project.todoList.forEach((todo) => {
                    todo.dueDate = new Date(todo.dueDate);
                })
            })

            console.log("retrieved from local storage");
        }
    }

    get localStorageKey() {
        return "todo list key";
    }

    addProject(name, description, todoList = []) {
        this.projectList.push(new Project(name, description, todoList));

        localStorage.setItem(this.localStorageKey, JSON.stringify(this.projectList));

        console.log("Test, newly added project:");
        console.log(this.projectList[this.projectList.length - 1]);
    }

    addTodoToProject(projectId, title, description, dueDate, priority, isFinished = false) {
        let selectedProject = this.projectList.find((project) => project.id === projectId);

        if (selectedProject === undefined) {
            console.log("O.o project not found wat");
            return;
        }

        selectedProject.todoList.push(new Todo(title, description, dueDate, priority, isFinished))

        localStorage.setItem(this.localStorageKey, JSON.stringify(this.projectList));

        console.log("Test, todo added to project:");
        console.log(selectedProject.todoList);
    }

    deleteProject(selectedProject) {
        let index = this.projectList.findIndex((project) => project === selectedProject);

        if (index === -1) {
            console.log("O.o project not found wat");
            return;
        }

        this.projectList.splice(index, 1);

        localStorage.setItem(this.localStorageKey, JSON.stringify(this.projectList));

        console.log(`Testing, the project list after removing project ${selectedProject.id}`);
        console.log(this.projectList);
    }

    deleteTodo(selectedProject, selectedTodo) {
        let todoIndex = selectedProject.todoList.findIndex((todo) => todo === selectedTodo);

        if (todoIndex === -1) {
            console.log("O.o todo not found wat");
            return;
        }

        selectedProject.todoList.splice(todoIndex, 1);

        localStorage.setItem(this.localStorageKey, JSON.stringify(this.projectList));
    }

    editTodo(selectedTodo, title, description, dueDate, priority) {
        selectedTodo.title = title;
        selectedTodo.description = description;
        selectedTodo.dueDate = dueDate;
        selectedTodo.priority = priority;

        localStorage.setItem(this.localStorageKey, JSON.stringify(this.projectList));
    }

    toggleTodoFinished(selectedTodo, isFinished) {
        selectedTodo.isFinished = isFinished;

        localStorage.setItem(this.localStorageKey, JSON.stringify(this.projectList));
    }

    sortTodos(selectedProject, property, sortOrder) {
        switch (property) {
            case "isFinished":
                this.sortTodosByFinished(selectedProject);
                break;
            case "title":
                this.sortTodosByTitle(selectedProject);
                break;
            case "description":
                this.sortTodosByDescription(selectedProject);
                break;
            case "dueDate":
                this.sortTodosByDueDate(selectedProject);
                break;
            case "priority":
                this.sortTodosByPriority(selectedProject);
                break;
        }

        if (sortOrder === "descending") {
            selectedProject.todoList.reverse();
        }

        localStorage.setItem(this.localStorageKey, JSON.stringify(this.projectList));
    }

    sortTodosByFinished(selectedProject) {
        selectedProject.todoList.sort((todo1, todo2) => {
            return (todo1.isFinished - todo2.isFinished) ||
                (todo1.dueDate - todo2.dueDate) ||
                (todo2.priority - todo1.priority) ||
                (todo1.title.localeCompare(todo2.title)) ||
                (todo1.description.localeCompare(todo2.description));
        });
    }

    sortTodosByTitle(selectedProject) {
        selectedProject.todoList.sort((todo1, todo2) => {
            return (todo1.title.localeCompare(todo2.title)) ||
                (todo1.isFinished - todo2.isFinished) ||
                (todo1.dueDate - todo2.dueDate) ||
                (todo2.priority - todo1.priority) ||
                (todo1.description.localeCompare(todo2.description));
        });
    }

    sortTodosByDescription(selectedProject) {
        selectedProject.todoList.sort((todo1, todo2) => {
            return (todo1.description.localeCompare(todo2.description)) ||
                (todo1.isFinished - todo2.isFinished) ||
                (todo1.dueDate - todo2.dueDate) ||
                (todo2.priority - todo1.priority) ||
                (todo1.title.localeCompare(todo2.title));
        });
    }

    sortTodosByDueDate(selectedProject) {
        selectedProject.todoList.sort((todo1, todo2) => {
            return (todo1.dueDate - todo2.dueDate) ||
                (todo1.isFinished - todo2.isFinished) ||
                (todo2.priority - todo1.priority) ||
                (todo1.title.localeCompare(todo2.title)) ||
                (todo1.description.localeCompare(todo2.description));
        });
    }

    sortTodosByPriority(selectedProject) {
        selectedProject.todoList.sort((todo1, todo2) => {
            return (todo2.priority - todo1.priority) ||
                (todo1.isFinished - todo2.isFinished) ||
                (todo1.dueDate - todo2.dueDate) ||
                (todo1.title.localeCompare(todo2.title)) ||
                (todo1.description.localeCompare(todo2.description));
        });
    }
}

export default ProjectManager;