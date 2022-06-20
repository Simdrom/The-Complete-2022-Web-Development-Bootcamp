const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs')

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'Our little secret.',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());
// Mongoose connection
main().catch(err => console.log(err))
  .finally(console.log(`Mongoose connection did`));

async function main() {
  const database = process.env.DB_DATABASE
  const mongoDBPassword = process.env.DB_PASSWORD
  const mongoUser = process.env.DB_USER
  const mongoURL = `${process.env.DB_HOST_1}${mongoUser}:${mongoDBPassword}${process.env.DB_HOST_2}/${database}`;

  await mongoose.connect(mongoURL);
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// End mongoose connection



app.get('/', function (req, res) {
  res.render('home');
})

app.route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post((req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
      if (err) { throw err; res.redirect('/redirect') }
      else {
        passport.authenticate('local')(req, res, () => {
          res.redirect('secrets')
        })
      }
    })
  })

app.route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post((req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    req.login(user, (err) => {
      if (err) throw err
      passport.authenticate('local')(req, res, () => {
        res.redirect('secrets')
      })
    })
  })

app.get('/logout', function (req, res) {
  req.logout(() => {
    res.redirect('/');
  })
})

app.get('/secrets', (req, res) => {
  if (req.isAuthenticated()) res.render('secrets')
  else res.redirect('login')
})

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});