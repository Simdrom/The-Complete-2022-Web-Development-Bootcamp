document.querySelectorAll("button").forEach(element => {
  element.addEventListener("click", function (event) {
    getAudioElement(this.innerText).play();
    togglePressedStyle(element);
  });

});

document.addEventListener('keydown', (event) => {
  var keyPressed = event.key;
  console.log(keyPressed);
  var keyPossibilities = ["w", "a", "s", "d", "j", "k", "l"];
  if (keyPossibilities.includes(keyPressed)) {
    getAudioElement(keyPressed).play();
    var elementPressed = document.querySelector(`button.${keyPressed}`);
    togglePressedStyle(elementPressed);
  };
});

function getAudioElement(element) {
  return new Audio(`sounds_copy/drum-${element}.mp3`);
};

function togglePressedStyle(element) {
  element.classList.add("pressed");
  setTimeout(function () {
    element.classList.remove("pressed");
  }, 50);
};