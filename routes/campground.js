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
      console.log('Current camp : ' + c);
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
//edit campground
router.get('/:id/edit', checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id)
    .then((foundCampground) => {
      res.render('campgrounds/edit', { campground: foundCampground });
    })
    .catch((error) => {
      res.redirect('/campgrounds');
    });
});
router.patch('/:id', checkCampgroundOwnership, (req, res) => {
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
router.delete('/:id', checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/campgrounds');
    })
    .catch(() => {
      res.redirect('/campgrounds');
    });
});

function isLogedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
function checkCampgroundOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    //does the user own the campground
    Campground.findById(req.params.id)
      .then((foundCampground) => {
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      })
      .catch((error) => {
        res.redirect('back');
      });
  } else {
    res.redirect('back');
  }
}

module.exports = router;
