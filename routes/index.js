const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
//Auth route
//home page route
router.get('/', (req, res) => {
  res.render('landing');
});
//register form
router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', (req, res) => {
  console.log(req.body);
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password)
    .then((user) => {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/campgrounds');
      });
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
      res.render('register');
    });
});
//show login form
router.get('/login', (req, res) => {
  res.render('login');
});
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.send('login sucessfull');
  }
);
//add logout route
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/campgrounds');
});

module.exports = router;
