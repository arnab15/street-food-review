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
          res.redirect('back');
        }
      })
      .catch((error) => {
        res.redirect('back');
      });
  } else {
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
          res.redirect('back');
        }
      })
      .catch((error) => {
        res.redirect('back');
      });
  } else {
    res.redirect('back');
  }
};
middleWareObj.isLogedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};
module.exports = middleWareObj;
