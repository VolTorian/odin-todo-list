import './styles.css';

const test = document.getElementById("test");

function greet() {
    console.log("Hello, world from the console!");
    test.textContent = "Hello, world from the script!";
}

greet();