var dices = document.querySelectorAll("div.dice");
var playerOneDice = dices[0];
var playerTwoDice = dices[1];
var playerOneDiceValue;
var playerTwoDiceValue;

function getRandomNumber(){
    var min = Math.ceil(1);
    var max = Math.floor(7);
    var position = Math.floor(Math.random() * (max - min) + min);
    return position;
}

function setPlayerDice(dice){

    var diceImg = dice.querySelector("img");
    var position = getRandomNumber();
    diceImg.setAttribute("src", "images/dice" + position + ".png");
    console.log(dice.querySelector("p").textContent+" rolled a " + position);
    
    return position;
}

window.onload = function() {
  playerOneDiceValue = setPlayerDice(playerOneDice);
  playerTwoDiceValue = setPlayerDice(playerTwoDice);
  compareBothDiceNumbers();
};

function rollDicePOne(){
  setPlayerDice(playerOneDice);
  compareBothDiceNumbers();
}

function rollDicePTwo(){
  setPlayerDice(playerTwoDice);
  compareBothDiceNumbers();
}

function compareBothDiceNumbers(){
  if(playerOneDiceValue > playerTwoDiceValue){
    var strWinsOne = "Player One Wins!";
    document.querySelector("title").textContent = strWinsOne;
    document.querySelector("h1").textContent = strWinsOne;
  }else if(playerOneDiceValue < playerTwoDiceValue){
    var strWinsTwo = "Player Two Wins!";
    document.querySelector("title").textContent = strWinsTwo;
    document.querySelector("h1").textContent = strWinsTwo;
  }else if(playerOneDiceValue === playerTwoDiceValue){
    var strEven= "It's a tie!";
    document.querySelector("title").textContent = strEven;
    document.querySelector("h1").textContent = strEven;
  }
}