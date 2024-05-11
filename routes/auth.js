var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var db = require("../models");
var UserService = require("../services/UserService");
var userService = new UserService(db);

/* Serialization and Deserialization */
passport.serializeUser((user, cb) => {
  cb(null, { id: user.Id, username: user.Username, role: user.RoleId });
});

passport.deserializeUser((user, cb) => {
  return cb(null, user);
});

/* Login Authentication */
passport.use(
  new LocalStrategy((username, password, cb) => {
    userService
      .getOne(username)
      .then((user) => {
        if (!user) {
          console.log("User not found");
          return cb(null, false, { message: "User not found" });
        }

        if (user.Password !== password) {
          console.log("Incorrect password.");
          return cb(null, false, { message: "Incorrect password." });
        }

        console.log("User authenticated successfully.");
        return cb(null, user);
      })
      .catch((err) => {
        console.error("Error in getOne:", err);
        return cb(err);
      });
  })
);

router.post(
  "/login/password",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
  })
);

/* Login Page */
router.get("/login", (req, res, next) => {
  const user = req.user?.username;
  res.render("login", { user });
});

/* Logout from the Login Page */
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

/* Logout from the Navbar */
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

/* Signup for New Users */
router.post("/signup", function (req, res, next) {
  userService
    .create(
      req.body.firstname,
      req.body.lastname,
      req.body.username,
      req.body.password
    )
    .then(() => {
      res.redirect("/login");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;