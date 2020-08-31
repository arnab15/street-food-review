const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const campgroundRoutes = require('./routes/campground');
const commentRoutes = require('./routes/comments');
const indexRoutes = require('./routes/index');

const seedDb = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// seedDb();//seed the db
//passport configuration
app.use(
  require('express-session')({
    secret: 'huguyghabwbhiguywvafjbkhfahkbkab',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/', indexRoutes);
app.listen(3000, () => {
  console.log('app is running on port 3000');
});
