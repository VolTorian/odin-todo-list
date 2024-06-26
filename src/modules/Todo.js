import {v4 as uuidv4} from 'uuid';

class Todo {
    constructor(title, description, dueDate, priority, isFinished = false) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isFinished = isFinished;

        // console.log(`Test, creating Todo with ID: ${this.id}`);
    }
}

export default Todo;