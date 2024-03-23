import './styles.css';
import Todo from './modules/Todo.js';
import ProjectManager from './modules/ProjectManager.js';

const _projectManager = new ProjectManager();

const test = document.getElementById("test");

function greet() {
    console.log("Hello, world from the console!");
    test.textContent = "Hello, world from the script!";

}

greet();

const testTodo = new Todo("testId", "testTitle", "testDescription", "testDueDate", "testPriority", "testFinished");
const testTodo2 = new Todo("testId2", "testTitle2", "testDescription2", "testDueDate2", "testPriority2", "testFinished2");
const testTodoList = [testTodo, testTodo2];

_projectManager.addProject("testProjectId", "testProjectName", testTodoList);
console.log(_projectManager);