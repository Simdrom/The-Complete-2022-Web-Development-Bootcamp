const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // console.log(req);
  // console.log(__dirname)

  // const url = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=73fdc68aa5783141ceb892d5194e9c10&units=metric`;

  res.sendFile(`${__dirname}/index.html`);
});

app.post('/weather', function (req, res) {
  const apiKey = '73fdc68aa5783141ceb892d5194e9c10';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${apiKey}&units=metric`;
  console.log(url);
  var weatherData;
  https.get(url, (response) => {
    console.log('statusCode:', response.statusCode);
    console.log('headers:', response.headers);

    response.on('data', (d) => {
      // process.stdout.write(d);

      weatherData = JSON.parse(d);
      // console.log(weatherData);
      var output = [];
      res.write(`<h1>Thanks for posting that! The city you selected is ${req.body.city}.`);
      res.write(`En ${req.body.city} hace ahora mismo ${weatherData.main.temp} grados.`);
      res.write(`Actualmente se siente como ${weatherData.main.feels_like}.`);
      res.write(`El cielo esta con ${weatherData.weather[0].description}</h1>`);

      const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
      res.write(`<img src=${iconUrl} alt="weather icon">`);


      res.send()
    });

  }).on('error', (e) => {
    console.error(e);
  });

});

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});


// // // var message = "Hello ";
// // // var name = " Raul" ;
// // // var promptMessage = "asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa asdklj kj hfwoierhbboirgibwi fun wije bfwpkjeb fwpiu hfwiopeu asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa asdklj kj hfwoierhbboirgibwi fun wije bfwpkjeb fwpi hfwpiuef hj"+ prompt("compose your message");
// // // alert(fullMessage) ;
// // // alert("You have written "+ promptMessage.length +" characters, you have "+ (140-promptMessage.length) +" characters left. We have to slice this "+promptMessage.slice(140, promptMessage.length-1))

// // // var promptName = prompt("enter text tyou name");
// // // alert("Hello, "+promptName.slice(0,1).toUpperCase() + promptName.slice(1,promptName.length).toLowerCase())

// // // var dogAge = prompt("What's your dog's age? ") ;
// // // var humanAge = ( (dogAge - 2) * 4 ) + 21 ;
// // // alert("Your dog's age in human age would be: " + humanAge);

// // function getMilk(bottles) {   
// //   console.log("leaveHouse");
// //   console.log("moveRight");
// //   console.log("moveRight");
// //   console.log("moveUp");
// //   console.log("moveUp");
// //   console.log("moveUp");
// //   console.log("moveUp");
// //   console.log("moveRight");
// //   console.log("moveRight");
// //   console.log("buy "+ Math.trunc(bottles / 1.5) + " bottles of muls")
// //   console.log("moveLeft");
// //   console.log("moveLeft");
// //   console.log("moveDown");
// //   console.log("moveDown");
// //   console.log("moveDown");
// //   console.log("moveDown");
// //   console.log("moveLeft");
// //   console.log("moveLeft");
// //   console.log("enterHouse");
// // }

// // getMilk(5);

// var ageIndays = 56  * 12 * 52 * 365


// var deadInDays = 90 * 12 * 52 * 365



// var ageIndWeeks = 56  * 12 * 52


// var deadInWeeks = 90 * 12 * 52


// var ageInMonths = 56  * 12


// var deadInMonths = 90 * 12


// console.log("You have "+(deadInDays - ageIndays)+" days, "+(deadInWeeks - ageIndWeeks)+" weeks, and "+(deadInMonths - ageInMonths)+" months left.")


//Create your function below this line.
//The first parameter should be the weight and the second should be the height.
// function bmiCalculator(weight, height){
//     return weight / height ** 2;
// }



// /* If my weight is 65Kg and my height is 1.8m, I should be able to call your function like this:*/

// var bmi = bmiCalculator(65, 1.8); 

// // bmi should equal 20 when it's rounded to the nearest whole number.


// console.log(bmi)


// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }
// // console.log(getRandomInt(7));
// // // expected output: 0, 1 or 2

// // console.log(getRandomInt(1));
// // // expected output: 0

// // console.log(Math.random());

// function getRandomInt2(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
// }

// // console.log(getRandomInt2(0,7))

// var loverOne = "Raul";
// var loverTwo= "Casca";
// var loveScore=getRandomInt2(0,101);

// if(loveScore > 30 && loveScore <= 70){
//   console.log("The compability betweet you and "+loverTwo+" is "+loveScore+"%.")  
// }else if(loveScore > 70){
//   console.log("The compability betweet you and "+loverTwo+" is "+loveScore+"%. You love each other like Kanye loves Kanye")  
// }else{
//   console.log("The compability betweet you and "+loverTwo+" is "+loveScore+"%. Yopu mustn't love no one ")
// }

// //Create your function below this line.
// //The first parameter should be the weight and the second should be the height.
// function bmiCalculator(weight, height){
//     var bmi = weight / height ** 2;
//     if(bmi < 18.5){
//         return("Your BMI is "+bmi+", so you are underweight")
//     }else if(bmi >= 18.5 && bmi < 24.9) {
//         return("Your BMI is "+bmi+", so you have a normal weight")
//     }else{
//          return("Your BMI is "+bmi+", so you are overweight")
//     }

// }



// // /* If my weight is 65Kg and my height is 1.8m, I should be able to call your function like this:*/


// console.log(bmiCalculator(60,2))
// console.log(bmiCalculator(105,85))

// function isLeap(year){
//     var moduleOfFour= year % 4;
//     var moduleOfHundred=  year % 100;
//     var moduleOfFourHundred = year % 400;

//     if(moduleOfFour === 0){
//         if( moduleOfHundred === 0 ){
//             if(moduleOfFourHundred === 0){
//                 return "Leap year.";
//             }else{
//                return "Not yeap year."; 
//             }
//         }else{
//             return "Leap year.";
//         }
//     }else{
//         return "Not leap year.";
//     }



// }

// console.log(isLeap(2000))
// console.log(isLeap(2100))
// console.log(isLeap(1989))
// console.log(isLeap(2400))
// console.log(isLeap(1948))
// console.log(isLeap(1998))

// var guestList = ["Angela","Jack","Pam","James","Lara","Jason"];
// var guestName = prompt("What's you're name");

// if(guestList.includes(guestName)){
//     alert("Your're welcome")
// }else{
//     alert("Your are not welcome")
// }
// var output = [];
// function fizzBuzz(){
//     var outputPosition = output.length;
//     if(outputPosition % 3 === 0 && outputPosition % 5 === 0){
//         output.push("FizzBuzz")
//     }else if (outputPosition % 3 === 0){
//         output.push("Fizz")
//     }else if (outputPosition % 5 === 0){
//         output.push("Buzz")
//     }else{
//         output.push(output.length)
//     }

//     console.log(output);
// }




// function whosPaying(names) {

// /******Don't change the code above*******/

//     //Write your code here.
//     var min = Math.ceil(0);
//     var max = Math.floor(names.length);
//     var position = Math.floor(Math.random() * (max - min) + min);
//     return names[position]+" is going to buy lunch today!";
// /******Don't change the code below*******/    
// }

// var names = ["Angela", "Ben", "Jenny", "Michael", "Chloe"];
// whosPaying(names)

// function beer(number){
//     i = number;
//     while (i > 0){
//         console.log(i+" bottles of beer on the wall, " +i+ " bottles of beer.");
//         console.log("Take one down and pass it around, "+ (i-1) +" bottles of beer on the wall");
//         console.log("")
//         i-- ;
//     }

//     return "No more bottles of beer on the wall, no bottles of beer. Go to the store and buy some more, "+ number + " bottles of beer on the wall."
// }

// function fibonacciGenerator(n){

//     var output = []
//     for(var i = 0; i < n; i++){
//         if(output.length === 0){
//             output.push(0)
//         }else if(output.length === 1){
//             output.push(1)
//         }else{

//             var pushValue = output[i - 1]
//             var previousPushValue = output[i - 2]

//             output.push( ( pushValue + previousPushValue ) )
//         }
//     }
//     return output;
// }

// console.log(fibonacciGenerator(5))
