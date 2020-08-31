//comments route
const express = require('express');
const router = express.Router({ mergeParams: true });

const Comment = require('../models/comment');
const Campground = require('../models/campground');

router.get('/new', isLogedIn, (req, res) => {
  //find campground by id
  Campground.findById(req.params.id)
    .then((campground) => {
      res.render('comments/new', { campground: campground });
    })
    .catch((e) => console.log(e));
});
router.post('/', isLogedIn, (req, res) => {
  //lookup campground using Id
  Campground.findById(req.params.id)
    .then((campground) => {
      Comment.create(req.body.comment).then((comment) => {
        //add user name and id to comment and save
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        comment.save();
        campground.comments.push(comment);
        campground.save();
        console.log(comment);
        res.redirect(`/campgrounds/${campground._id}`);
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/campground');
    });
  //create new comment
  //connect new comment to campground
  //redirect campground show page
});
function isLogedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
module.exports = router;
