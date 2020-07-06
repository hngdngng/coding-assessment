//Grab elements for functions
var timeDisplay = document.querySelector("#timer");
var quizBank = [{ question: "Commonly used data types DO NOT include ___.", choices: ["strings", "booleans", "alerts", "numbers"], correct: "alerts" }, { question: "The condition in an if/else statement is enclosed within ___.", choices: ["quotes", "curly braces", "parentheses", "square brackets"], correct: "parentheses" }, { question: "Arrays in JavaScript can be used to store ___.", choices: ["numbers and strings", "other arrays", "booleans", "all of the above"], correct: "all of the above" }, { question: "String values must be enclosed within ___ when being assigned to variables.", choices: ["commas", "curly brackets", "quotes", "parentheses"], correct: "parenthesis" }, { question: "A very useful tool used during development and debugging for printing content to the debugger is:", choices: ["JavaScript", "terminal/bash", "for loops", "console.log"], correct: "console.log" }];
var questionDisplay = document.querySelector("#question");
var scoreDisplay = document.querySelector("#score");
var c1 = document.querySelector("#c1");
var c2 = document.querySelector("#c2");
var c3 = document.querySelector("#c3");
var c4 = document.querySelector("#c4");
var userIndex = 0;
var timeLeft = 75;
var timerInterval, userChoice;

function startQuiz() {
    document.querySelector(".start-body").style.display = "none";
    document.querySelector(".quiz-body").style.display = "block";
    runQuiz();
}

function endQuiz() {
    document.querySelector(".quiz-body").style.display = "none";
    document.querySelector(".end-body").style.display = "block";
    clearInterval(timerInterval);
    scoreDisplay.textContent = "Your final score is: " + timeLeft;
}

function runQuiz() {
    if (userIndex < quizBank.length) {
        questionDisplay.textContent = quizBank[userIndex].question;
        c1.textContent = quizBank[userIndex].choices[0];
        c2.textContent = quizBank[userIndex].choices[1];
        c3.textContent = quizBank[userIndex].choices[2];
        c4.textContent = quizBank[userIndex].choices[3];
    } else {
        endQuiz();
    }
}

function userSelect(event) {
    if (event.target.matches("button")) {
        event.preventDefault();
        userChoice = event.target.textContent;
        userScore();
        runQuiz();
    }
}

function userScore() {
    if (userChoice != quizBank[userIndex].correct) {
        timeLeft = timeLeft - 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }
    userIndex++;
}

function timer() {
    timerInterval = setInterval(function () {
        timeLeft--; //decrease by 1
        timeDisplay.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000); //executes code inside setInterval function every second (1000ms)
}

function highscoreScreen() {
    window.location.href = "./highscores.html";
}

function highscoreUpdate() {
    var initialsInput = document.querySelector("#initials").value;
    console.log(initialsInput);
    if (!initialsInput) {
        return
    } else {
        var userLog = initialsInput.trim() + ": " + timeLeft;
        var listHighscore = JSON.parse(localStorage.getItem("listHighscore"));
        if(!listHighscore) { //if listHighscore is null or undefined
            listHighscore = [];
        } 
        listHighscore.push(userLog); 
        document.querySelector("#initials").value = "";
    }
    localStorage.setItem("listHighscore", JSON.stringify(listHighscore)); //create a local storage memory item called listHighscores as the array scores in code
    highscoreScreen();
}

document.querySelector(".btn-start").addEventListener("click", function () {
    startQuiz();
    timer();
}); //when start is clicked, start the quiz (startQuizFn) and start the timer (TimerFn)
document.querySelector("ul").addEventListener("click", userSelect); //when user selects an answer choice, run userSelect function
document.querySelector(".btn-score").addEventListener("click", highscoreScreen);
document.querySelector("#submit").addEventListener("click", function(){
    highscoreUpdate();
});