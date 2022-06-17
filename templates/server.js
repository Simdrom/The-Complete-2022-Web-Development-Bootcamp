const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.get('/', function (req, res) {
  res.send("Hello");
})

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});