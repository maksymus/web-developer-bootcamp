var numSquares = 6;
var colors = [];
var gameOver = false;
var goalColor;

var title = document.querySelector("#title");
var goalColorDisplay = document.querySelector("#goalColorDisplay");
var messageDisplay = document.querySelector("#message");
var squares = document.querySelectorAll(".square");

function colorString(color) {
    return "rgb(" + color.r + ", " + color.g + ", " + color.b +")";
}

function randomColor() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
}

function pickColor(colors) {
    return colors[Math.floor(Math.random() * (colors.length))];
}

function generateRandomColors(numColors) {
    var colors = [];
    for (var i = 0; i < numColors; i++) {
        colors[i] = randomColor();
    }
    return colors;
}

function startGame() {
    gameOver = false;
    colors = generateRandomColors(numSquares);
    goalColor = pickColor(colors);

    messageDisplay.textContent = "";
    goalColorDisplay.textContent = colorString(goalColor);
    title.style.backgroundColor = "steelblue";

    for (var i = 0; i < numSquares; i++) {
        squares[i].style.backgroundColor = colorString(colors[i]);
        // squares[i].textContent = squares[i].style.backgroundColor;

        squares[i].addEventListener('click', function () {
            if (gameOver)
                return;

            var selectedColor = this.style.backgroundColor;

            if (selectedColor === colorString(goalColor)) {
                gameOver = true;
                messageDisplay.textContent = "Correct!!!";
                title.style.backgroundColor = selectedColor;

                for (var j = 0; j < numSquares; j++) {
                    squares[j].style.backgroundColor = selectedColor;
                }
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again!!!";
            }
        });
    }
}

var reset = document.querySelector("#reset");
reset.addEventListener('click', function () {
    startGame();
});

var easyModeButton = document.querySelector("#easyMode");
var hardModeButton = document.querySelector("#hardMode");

easyModeButton.addEventListener('click', function () {
    numSquares = 3;
    easyModeButton.classList.add("selected");
    hardModeButton.classList.remove("selected");

    for (var i = 3; i < squares.length; i++) {
        squares[i].style.display = "none";
    }

    startGame();
});

hardModeButton.addEventListener('click', function () {
    numSquares = 6;
    easyModeButton.classList.remove("selected");
    hardModeButton.classList.add("selected");

    for (var i = 3; i < squares.length; i++) {
        squares[i].style.display = "block";
    }

    startGame();
});

startGame();