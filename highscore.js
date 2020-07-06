var highscoreDisplay = document.querySelector("#user-highscores");
var listHighscore = JSON.parse(localStorage.getItem("listHighscore"));

if (listHighscore) {
    renderHighscore();
} else {
    highscoreDisplay.innerHTML = "No Highscores";
}

function renderHighscore() {
    for (var i = 0; i<listHighscore.length; i++) {
        var li = document.createElement("li");
        li.textContent = listHighscore[i]; 
        highscoreDisplay.appendChild(li); 
    }
}

document.querySelector(".btn-back").addEventListener("click", function(){
    window.location.href = "./index.html";
});
document.querySelector(".btn-clear").addEventListener("click", function(){
    highscoreDisplay.innerHTML = "No Highscores";
    localStorage.removeItem("listHighscore");
});