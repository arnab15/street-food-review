const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

//Index display all campgrouds
router.get('/', (req, res) => {
  //get all the campgrounds from db
  console.log(req.user);
  Campground.find({})
    .then((allCampgrounds) => {
      res.render('campgrounds/index', {
        campGrounds: allCampgrounds,
        currentUser: req.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
//CREAT add new campground to db
router.post('/', isLogedIn, (req, res) => {
  //get data from form add to campground array
  const { name, image, description } = req.body;
  const newCampground = { name, image, description };
  //create a new campground and save
  Campground.create(newCampground)
    .then(() => {
      //redirect back to campground
      res.redirect('/campgrounds');
    })
    .catch((err) => {
      console.log(err);
    });
});
//NEW Display form to make a new dog
router.get('/new', isLogedIn, (req, res) => {
  res.render('campgrounds/new');
});
//Show an indivisual campground with more info
router.get('/:id', (req, res) => {
  //find the campground with provided id

  Campground.findById(req.params.id)
    .populate('comments')
    .then((foundCampground) => {
      res.render('campgrounds/show', { campground: foundCampground });
    })
    .catch((error) => {
      console.log(error);
    });
  //render show template with that campground
});
function isLogedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
module.exports = router;
