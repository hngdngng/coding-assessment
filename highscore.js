// Published on https://hngdngng.github.io/coding-assessment/ 

var highscoreDisplay = document.querySelector("#user-highscores");
var listHighscore = JSON.parse(localStorage.getItem("listHighscore"));

if (listHighscore) {
    renderHighscore();
} else {
    highscoreDisplay.innerHTML = "No Highscores";
}

function renderHighscore() {
    for (var i = 0; i<listHighscore.length; i++) {
        listHighscore.sort(function(a,b) {
            return b.score-a.score; //go through each of the objects and compare score values, sort from high to low
        });
        var li = document.createElement("li");
        li.textContent = listHighscore[i].name + ": " + listHighscore[i].score; 
        highscoreDisplay.appendChild(li); //append and display score on page
    }

}

document.querySelector(".btn-back").addEventListener("click", function(){
    window.location.href = "./index.html";
});
document.querySelector(".btn-clear").addEventListener("click", function(){
    highscoreDisplay.innerHTML = "No Highscores";
    localStorage.removeItem("listHighscore");
});