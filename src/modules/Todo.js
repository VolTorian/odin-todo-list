class Todo {
    constructor(id, title, description, dueDate, priority, isFinished = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isFinished = isFinished;
    }
}

export default Todo;