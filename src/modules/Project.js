class Project {
    constructor(id, name, description, todoList = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.todoList = todoList;
    }

    addTodo(todo) {
        this.todoList.push(todo);
    }
}

export default Project;