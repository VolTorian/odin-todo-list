class Project {
    constructor(id, name, todoList = []) {
        this.id = id;
        this.name = name;
        this.todoList = todoList;
    }
}

export default Project;