import './styles.css';
import Todo from './modules/Todo.js';
import Project from './modules/Project.js';
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

_projectManager.addProject("testProjectName", "testProjectDescription", testTodoList);
let testProjectId = _projectManager.projectList[0].id;
console.log(testProjectId);

_projectManager.addTodoToProject(testProjectId, "another todo name", "empty desc", "empty due date", "empty priority", true);

console.log(_projectManager);