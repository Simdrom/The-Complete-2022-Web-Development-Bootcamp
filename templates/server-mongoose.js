// JS requires
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// Node setup
const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Mongoose connection
main().catch(err => console.log(err))
  .finally(console.log(`Mongoose connection did`));

async function main() {
  const database = 'wikiDB'
  const mongoDBPassword =  'mongo'
  const mongoDB = `mongodb+srv://admin-raul:${mongoDBPassword}@cluster0.n5qqk.mongodb.net`;
  await mongoose.connect(`${mongoDB}/${database}`);
}

// Mongoose config
const articlesSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Articles = mongoose.model("Articles", articlesSchema);

const data = [
  {
    "title": "",
    "content": ""
  },
];

// Database initialization
const defaultObjectsInDB = [];

data.forEach(object => {
  defaultObjectsInDB.push( new Articles({
    title : object.title,
    content : object.content
  }));
})

defaultObjectsInDB.forEach(object => Articles.find({ title: object.title }, function (err, objectInDB) {
  if (err) throw err
  else {
    if (objectInDB.length === 0) {
      Articles.insertMany(object, function (err) {
        if (err) throw err
        else console.log(`Saved one object:\n ${object}`);
      });
    } else {
      console.log(`Object already in DB\n${object}`)
    }
  }
}))

// Express routing

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});