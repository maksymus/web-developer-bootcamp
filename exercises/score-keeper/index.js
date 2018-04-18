var gameOver = false;

var maxScoreDisplay = document.querySelector("#maxScoreDisplay");
var minScoreInput = document.querySelector("#minScoreInput");

var player1 = document.querySelector("#player1");
var player2 = document.querySelector("#player2");

var button1 = document.querySelector("#button1");
var button2 = document.querySelector("#button2");
var reset = document.querySelector("#reset");

reset.addEventListener("click", function () {
    player1.textContent = 0;
    player2.textContent = 0;
    maxScoreDisplay.textContent = 5;
    gameOver = false;

    player1.classList.remove('win', 'lose');
    player2.classList.remove('win', 'lose');
});

button1.addEventListener("click", function () {
    increment(player1, player2);
});

button2.addEventListener("click", function () {
    increment(player2, player1);
});

minScoreInput.addEventListener("change", function () {
    maxScoreDisplay.textContent = this.value;
});

function increment(winner, loser) {
    if (gameOver)
        return;

    var max = document.querySelector("#maxScoreDisplay");
    var maxNumber = new Number(max.textContent);

    var res = new Number(winner.textContent) + 1;
    winner.textContent = res;

    if (res == maxNumber) {
        gameOver = true;
        winner.classList.add('win');
        loser.classList.add('lose');
    }
}

