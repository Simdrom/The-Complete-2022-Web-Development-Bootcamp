const express = require('express');
const bodyParser =require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  // console.log(req);
  // console.log(__dirname)
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/', function(req,res){

  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var result = num1+ num2;
  res.send(`Thanks for posting that! The result of the calculation is ${result}`)
});

app.get('/bmicalculator', (req, res) => {
  res.sendFile(`${__dirname}/bmiCalculator.html`);
});

app.post('/bmicalculator', function(req,res){

  var weight = Number(req.body.weight);
  var height = Number(req.body.height);
  var result = weight / Math.pow(height,2);
  res.send(`You BMI is ${result}`)
});

app.listen(port, function(){
  console.log(`Server started on port ${port}`);
});