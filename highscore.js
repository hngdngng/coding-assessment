var highscoreDisplay = document.querySelector("#user-highscores");
var listHighscore = JSON.parse(localStorage.getItem("listHighscore"));

renderHighscore();

function renderHighscore() {
    for (var i = 0; i<listHighscore.length; i++) {
        var li = document.createElement("li");
        li.textContent = listHighscore[i]; 
        highscoreDisplay.appendChild(li); 
    }
}