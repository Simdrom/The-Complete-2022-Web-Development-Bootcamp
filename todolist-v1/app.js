const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+ "/date.js");



const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

app.get('/', function (req, res) {
 
  let day = date.getDate();
  res.render('list', { listTitle: day, newListItem: items })
});

app.post("/", function (req, res) {
  let item = req.body.NewTodoListItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item);
    res.redirect("/")
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItem: workItems })
})

app.post("/work", function (req, res) {
  let item = req.body.NewTodoListItem;

  workItems.push(item);
  res.redirect("/work")
})

app.get("/about", function (req, res) {
  res.render("about")
})

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});