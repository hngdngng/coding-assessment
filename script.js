//Published on https://hngdngng.github.io/coding-assessment/

//Grab elements
var timeDisplay = document.querySelector("#timer");
var quizBank = [{ question: "Commonly used data types DO NOT include ___.", choices: ["strings", "booleans", "alerts", "numbers"], correct: "alerts" }, { question: "The condition in an if/else statement is enclosed within ___.", choices: ["quotes", "curly braces", "parentheses", "square brackets"], correct: "parentheses" }, { question: "Arrays in JavaScript can be used to store ___.", choices: ["numbers and strings", "other arrays", "booleans", "all of the above"], correct: "all of the above" }, { question: "String values must be enclosed within ___ when being assigned to variables.", choices: ["commas", "curly brackets", "quotes", "parentheses"], correct: "parenthesis" }, { question: "A very useful tool used during development and debugging for printing content to the debugger is:", choices: ["JavaScript", "terminal/bash", "for loops", "console.log"], correct: "console.log" }];
var questionDisplay = document.querySelector("#question");
var scoreDisplay = document.querySelector("#score");
//Declare global variables
var c1 = document.querySelector("#c1");
var c2 = document.querySelector("#c2");
var c3 = document.querySelector("#c3");
var c4 = document.querySelector("#c4");
var userIndex = 0;
var timeLeft = 75;
var timerInterval, userChoice;

function startQuiz() {
    //change display mode of content from start div to quiz div
    document.querySelector(".start-body").style.display = "none";
    document.querySelector(".quiz-body").style.display = "block";
    //call runQuiz() to display questionnaire and start timer
    runQuiz();
}

function runQuiz() {
    if (userIndex < quizBank.length) { //run until end of questionnaire
        //change question text content to what is stored in the question property of the object at the index, i, of quizBank array
        questionDisplay.textContent = quizBank[userIndex].question;
        //change answer choice text content to what is stored in the choices property of the object at the index, i, of the quizBank array
        c1.textContent = quizBank[userIndex].choices[0];
        c2.textContent = quizBank[userIndex].choices[1];
        c3.textContent = quizBank[userIndex].choices[2];
        c4.textContent = quizBank[userIndex].choices[3];
    } else {
        endQuiz(); //run endQuiz once the user advances through all questions
    }
}

function endQuiz() {
    //change display mode of content from quiz div to end div
    document.querySelector(".quiz-body").style.display = "none";
    document.querySelector(".end-body").style.display = "block";
    scoreDisplay.textContent = "Your final score is: " + timeLeft;
    clearInterval(timerInterval); //stop timer
    timeDisplay.textContent = "Time: " + timeLeft; //update timer display
}

function userSelect(event) {
    if (event.target.matches("button")) { //when the user selects an answer choice button
        event.preventDefault(); //prevent page from refreshing
        userChoice = event.target.textContent; //store user choice in userChoice var
        userScore(); //update their score
        runQuiz(); //continue to call quiz function
    }
}

function userScore() {
    if (userChoice != quizBank[userIndex].correct) { //if the userChoice does not equal the correct answer in the quizBank array
        console.log(timeLeft);
        timeLeft = timeLeft - 10; //deduct 10 from time left
        console.log(timeLeft);
        if (timeLeft < 0) { //if time is less than 0, set time to 0 to avoid negative values
            timeLeft = 0;
        }
    }
    userIndex++; //increment index variable
}

function timer() {
    timerInterval = setInterval(function () {
        console.log("time" + timeLeft);
        timeDisplay.textContent = "Time: " + timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
        timeLeft--; //decrease by 1
    }, 1000); //executes code inside setInterval function every second (1000ms)
}

function highscoreScreen() {
    window.location.href = "./highscores.html";
}

function highscoreUpdate(event) {
    event.preventDefault(); //prevent page from refreshing
    var initialsInput = document.querySelector("#initials").value;
    if (!initialsInput) {
        return
    } else {
        //var userLog = initialsInput.trim() + ": " + timeLeft;
        var userLog = {name: initialsInput.trim(), score: timeLeft};
        var listHighscore = JSON.parse(localStorage.getItem("listHighscore")); //get exisiting highscores in storage
        if (!listHighscore) { //if listHighscore is null or undefined
            listHighscore = [];
        }
        listHighscore.push(userLog);
        document.querySelector("#initials").value = "";
    }
    localStorage.setItem("listHighscore", JSON.stringify(listHighscore)); //create a local storage memory item called listHighscores as the array of userLog objects
    highscoreScreen();
}

//when start is clicked, start the quiz (startQuizFn) and start the timer (TimerFn)
document.querySelector(".btn-start").addEventListener("click", function () {
    startQuiz();
    timer();
}); 
//when an answer choice button is clicked, update user score
document.querySelector("ul").addEventListener("click", userSelect); //when user selects an answer choice, run userSelect function
document.querySelector(".btn-score").addEventListener("click", highscoreScreen);
document.querySelector("#submit").addEventListener("click", highscoreUpdate);
document.querySelector("#form").addEventListener("submit", highscoreUpdate);