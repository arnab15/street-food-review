const Comment = require('../models/comment');
const Campground = require('../models/campground');
const middleWareObj = {};
middleWareObj.checkCampgroundOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    //does the user own the campground
    Campground.findById(req.params.id)
      .then((foundCampground) => {
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'Campground not found');
          res.redirect('back');
        }
      })
      .catch((error) => {
        req.flash('error', 'You do not have permission to do that');

        res.redirect('back');
      });
  } else {
    req.flash('error', 'You need to be logged in to do that');

    res.redirect('back');
  }
};
middleWareObj.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    //does the user own the campground
    Comment.findById(req.params.comment_id)
      .then((foundComment) => {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'Comment not found');
          res.redirect('back');
        }
      })
      .catch((error) => {
        req.flash('error', 'You do not have permission to do that');
        res.redirect('back');
      });
  } else {
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('back');
  }
};
middleWareObj.isLogedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You need to be logged in to do that');
  res.redirect('/login');
};
module.exports = middleWareObj;
