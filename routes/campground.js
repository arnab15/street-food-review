const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middlewre = require('../middleware/index');
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
router.post('/', middlewre.isLogedIn, (req, res) => {
  //get data from form add to campground array
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  const { name, image, description } = req.body;
  const newCampground = { name, image, description, author };

  //create a new campground and save
  Campground.create(newCampground)
    .then((c) => {
      //redirect back to campground
      req.flash('success', 'New Campground Created');
      res.redirect('/campgrounds');
    })
    .catch((err) => {
      console.log(err);
    });
});
//NEW Display form to make a new dog
router.get('/new', middlewre.isLogedIn, (req, res) => {
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
//edit campground
router.get('/:id/edit', middlewre.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id)
    .then((foundCampground) => {
      res.render('campgrounds/edit', { campground: foundCampground });
    })
    .catch((error) => {
      res.redirect('/campgrounds');
    });
});
router.patch('/:id', middlewre.checkCampgroundOwnership, (req, res) => {
  //find and update correct campground

  Campground.findByIdAndUpdate(req.params.id, req.body.campground)
    .then((updateCamp) => {
      res.redirect('/campgrounds/' + req.params.id);
    })
    .catch(() => {
      res.redirect('/campgrounds');
    });
});
//delete campground
router.delete('/:id', middlewre.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/campgrounds');
    })
    .catch(() => {
      res.redirect('/campgrounds');
    });
});

module.exports = router;
