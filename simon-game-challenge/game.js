// alert("OK")

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
  changeTitle();
  userClickedPattern = [];
}

function changeTitle() {
  $("h1").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(color) {
  var activeButton = $("#" + color);
  activeButton.addClass("pressed");
  setTimeout(function () {
    activeButton.removeClass("pressed");
  }, 50);
}

$("div.btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (gamePattern.length === userClickedPattern.length) {
    checkAnswer(userClickedPattern.length);
  } else {
    checkCurrentAnswers();
  }
});


function checkAnswer(currentLevel) {
  if (equals(gamePattern, userClickedPattern)) {

    $("h1").text("Well done. Increasing difficulty...");
    setTimeout(function () {
      nextSequence();
      level++;
    }, 1000);
  } else {
    failedGame();
  }

}

function checkCurrentAnswers() {
  var arrayAnswers = [];
  userClickedPattern.forEach((pattern, index) => {
    if (pattern === gamePattern[index]) {
      arrayAnswers.push(true);
    } else {
      arrayAnswers.push(false);
    }
  });
  if (arrayAnswers.includes(false)) {
    failedGame();
  }
}

$("body").keypress(function (event) {
  if (event.key === "a" && level === 0) {
    nextSequence();
    level++;
  }
  if (event.key === "r") {
    reset();
  }
});

function failedGame() {
  $("h1").text("Ohh no, you have failed!");
  setTimeout(function () {
    $("body").toggleClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
  }, 2000);

  $("body").keypress(function (event) {
    setTimeout(function () {
      reset();
    }, 300);
  });

}
function reset() {
  $("h1").text("Resetting game...");
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  setTimeout(function () {
    $("body").removeClass("game-over");
    nextSequence();
    level++;
  }, 1000);
}
const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);