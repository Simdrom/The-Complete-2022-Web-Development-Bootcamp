const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  // console.log(req);
  res.send('<html><head><title>Hello world!</title></head><body>Hello world!</body></html>');

});


app.listen(port, function(){
  console.log(`Server started on port ${port}`);
});