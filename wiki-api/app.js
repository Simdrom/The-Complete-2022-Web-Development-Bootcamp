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
  const mongoDBPassword = 'mongo'
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
    "title": "REST",
    "content": "REST is short for REpresentational State Transfer. IIt's an architectural style for designing APIs."
  },
  {
    "title": "API",
    "content": "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
  },
  {
    "title": "Bootstrap",
    "content": "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
  },
  {
    "title": "DOM",
    "content": "The Document Object Model is like an API for interacting with our HTML"
  },
  {
    "title": "Jack Bauer",
    "content": "Jack Bauer once stepped into quicksand. The quicksand couldn't escape and nearly drowned.",
  }
];

// Database initialization
const defaultObjectsInDB = [];

data.forEach(object => {
  defaultObjectsInDB.push(new Articles({
    title: object.title,
    content: object.content
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

app.route('/articles')
  // GET All articles
  .get((req, res) => {
    Articles.find({}, function (err, articles) {
      if (err) throw err
      else {
        console.log(`Articles: ${articles}`)
        res.send(articles);
      }
    })
  })
  // POST NEW Article
  .post((req, res) => {
    const newArticle = new Articles({
      title: req.body.title,
      content: req.body.content
    });

    Articles.insertMany(newArticle, function (err, article) {
      if (err) throw err
      else {
        console.log(`Article inserted: ${JSON.stringify(article)}`)
        res.send(article);
        // }
      }
    })
  })
  // DELETE ALL Articles
  .delete((req, res) => {
    Articles.deleteMany({}, function (err, result) {
      if (err) throw err
      else {
        console.log(`All articles deleted: ${JSON.stringify(result)}`)
        res.send(result);
        // }
      }
    })
  });

app.route('/articles/:articleTitle')
  // GET Article by TITLE
  .get((req, res) => {
    Articles.findOne({ title: req.params.articleTitle }, function (err, article) {
      if (err) throw err
      else {
        res.send(article)
      }
    })
  })
  // PUT Article by TITLE
  .put((req, res) => {
    Articles.findOneAndReplace({ title: req.params.articleTitle }, { title: req.body.title, content: req.body.content }, { returnDocument: 'after' }, function (err, result) {
      if (err) throw err
      else res.send(result)
    })
  })
  // PACHT Article by TITLE
  .patch((req, res) => {
    Articles.findOneAndUpdate({ title: req.params.articleTitle }, { content: req.body.content }, { returnDocument: 'after' }, function (err, result) {
      if (err) throw err
      else res.send(result)
    })
  })
  // DELETE Article by TITLE
  .delete((req, res) => {
    Articles.deleteOne({ title: req.params.articleTitle }, function (err, result) {
      if (err) throw err
      else res.send(result)
    })
  })
// End Express routing

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});