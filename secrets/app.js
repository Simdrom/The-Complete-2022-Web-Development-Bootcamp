const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var findOrCreate = require("mongoose-findorcreate");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);

app.use(passport.initialize());
app.use(passport.session());
// Mongoose connection
main()
  .catch((err) => console.log(err))
  .finally(console.log(`Mongoose connection did`));

async function main() {
  const database = process.env.DB_DATABASE;
  const mongoDBPassword = process.env.DB_PASSWORD;
  const mongoUser = process.env.DB_USER;
  const mongoURL = `${process.env.DB_HOST_1}${mongoUser}:${mongoDBPassword}${process.env.DB_HOST_2}/${database}`;

  await mongoose.connect(mongoURL);
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      scope: ["profile"],
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(`Profile: ${JSON.stringify(profile)}`);
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
// End mongoose connection

app.get("/", function (req, res) {
  res.render("home");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);
app.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
  }
);
app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    User.register(
      { username: req.body.username },
      req.body.password,
      (err, user) => {
        if (err) {
          throw err;
          res.redirect("/redirect");
        } else {
          passport.authenticate("local")(req, res, () => {
            res.redirect("secrets");
          });
        }
      }
    );
  });

app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    req.login(user, (err) => {
      if (err) throw err;
      passport.authenticate("local")(req, res, () => {
        res.redirect("secrets");
      });
    });
  });

app.get("/logout", function (req, res) {
  req.logout(() => {
    res.redirect("/");
  });
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    User.find({ secret: { $ne: null } }, (err, foundUser) => {
      if (err) throw err;
      else res.render("secrets", { usersWithSecrets: foundUser });
    });

    // res.render('secrets')
  } else res.redirect("login");
});

app.get("/submit", (req, res) => {
  if (req.isAuthenticated()) res.render("submit");
  else res.redirect("login");
});

app.post("/submit", (req, res) => {
  if (req.isAuthenticated()) {
    const submittedSecret = req.body.secret;

    console.log(req.user.id);
    User.findById(req.user.id, (err, foundUser) => {
      if (err) throw err;
      else if (foundUser) {
        console.log(JSON.stringify(foundUser));
        foundUser.secret = submittedSecret;
        foundUser.save(() => {
          res.redirect("secrets");
        });
      }
    });
  } else res.redirect("login");
});

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
