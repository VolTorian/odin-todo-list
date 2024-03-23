class Project {
    constructor(id, name, todoList = []) {
        this.id = id;
        this.name = name;
        this.todoList = todoList;
    }

    addTodo(todo) {
        this.todoList.push(todo);
    }
}

export default Project;