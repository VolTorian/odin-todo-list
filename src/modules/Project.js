import {v4 as uuidv4} from 'uuid';

class Project {
    constructor(name, description, todoList = []) {
        this.id = uuidv4();
        this.name = name;
        this.description = description;
        this.todoList = todoList;
    }

    addTodo(todo) {
        this.todoList.push(todo);
    }
}

export default Project;