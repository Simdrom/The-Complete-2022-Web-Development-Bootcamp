const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Mongoose connection
main().catch(err => console.log(err))
  .finally(console.log(`Mongoose connection did`));

async function main() {
  const database = 'userDB'
  const mongoDBPassword = 'mongo'
  const mongoDB = `mongodb+srv://admin-raul:${mongoDBPassword}@cluster0.n5qqk.mongodb.net`;
  await mongoose.connect(`${mongoDB}/${database}`);
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('home');
})
app.route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post((req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    console.log(`Email: ${email} and password: ${password}`)

    User.findOne({ email: email, password: password }, function (err, foundUser) {
      if (err) throw err
      else {
        if (foundUser && foundUser.password === password) res.render('secrets')
        else res.redirect('/')
      }
    })
  })

app.route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post((req, res) => {
    const newUser = new User({
      email: req.body.username,
      password: req.body.password
    });
    newUser.save(function (err) {
      if (err) throw err
      else res.render('secrets')
    })
  })

  app.get('/logout', function (req, res) {
    res.redirect('/')
  })

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});