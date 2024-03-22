import './styles.css';
import Todo from './modules/Todo.js';

const test = document.getElementById("test");

function greet() {
    console.log("Hello, world from the console!");
    test.textContent = "Hello, world from the script!";

    const testTodo = new Todo("testId", "testTitle", "testDescription", "testDueDate", "testPriority", "testFinished");
    console.log(testTodo);
}

greet();