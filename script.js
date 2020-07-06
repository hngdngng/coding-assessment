//Grab elements for functions
var timeDisplay = document.querySelector("#timer");
var quizBank = [{ question: "Commonly used data types DO NOT include ___.", choices: ["strings", "booleans", "alerts", "numbers"] }, { question: "The condition in an if/else statement is enclosed within ___.", choices: ["quotes", "curly braces", "parentheses", "square brackets"] }, { question: "Arrays in JavaScript can be used to store ___.", choices: ["numbers and strings", "other arrays", "booleans", "all of the above"] }, { question: "String values must be enclosed within ___ when being assigned to variables.", choices: ["commas", "curly brackets", "quotes", "parentheses"] }, { question: "A very useful tool used during development and debugging for printing content to the debugger is:", choices: ["JavaScript", "terminal/bash", "for loops", "console.log"]}];
var questionDisplay = document.querySelector("#question");
var c1 = document.querySelector("#c1");
var c2 = document.querySelector("#c2");
var c3 = document.querySelector("#c3");
var c4 = document.querySelector("#c4");
var userIndex = 0;
var timeLeft = 10;
var timerInterval;
var score = 0;

function startQuizFn() {
    document.querySelector(".start-body").style.display = "none";
    document.querySelector(".quiz-body").style.display = "block";
    quizFn();
}

function quizFn() {
    if (userIndex < quizBank.length) {
        questionDisplay.textContent = quizBank[userIndex].question;
        c1.textContent = quizBank[userIndex].choices[0];
        c2.textContent = quizBank[userIndex].choices[1]
        c3.textContent = quizBank[userIndex].choices[2];
        c4.textContent = quizBank[userIndex].choices[3];
    } else {
        document.querySelector(".quiz-body").style.display = "none";
        document.querySelector(".end-body").style.display = "block";
        clearInterval(timerInterval);
    }
}

function userSelect(event) {
    if (event.target.matches("button")) {
        event.preventDefault();
        userIndex++;
        quizFn();
    }
}

function timerFn() {
    timerInterval = setInterval(function () {
        timeLeft--; //decrease by 1
        timeDisplay.textContent = "Time: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            document.querySelector(".quiz-body").style.display = "none";
            document.querySelector(".end-body").style.display = "block";
        }
    }, 1000); //executes code inside setInterval function every second (1000ms)
}

document.querySelector(".btn-start").addEventListener("click", function() {
    startQuizFn();
    timerFn();
}); //when start is clicked, run quiz function
document.querySelector("ul").addEventListener("click", userSelect); //when user selects an answer choice, run userSelect function
