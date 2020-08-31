//comments route
const express = require('express');
const router = express.Router({ mergeParams: true });

const Comment = require('../models/comment');
const Campground = require('../models/campground');
const comment = require('../models/comment');
const middlewre = require('../middleware/index');

router.get('/new', middlewre.isLogedIn, (req, res) => {
  //find campground by id
  Campground.findById(req.params.id)
    .then((campground) => {
      res.render('comments/new', { campground: campground });
    })
    .catch((e) => console.log(e));
});
router.post('/', middlewre.isLogedIn, (req, res) => {
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
//comment edit template showing route
router.get('/:comment_id/edit', middlewre.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id)
    .then((comment) => {
      res.render('comments/edit', { campground_id: req.params.id, comment });
    })
    .catch(() => {
      res.redirect('back');
    });
});
router.patch('/:comment_id', middlewre.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
    .then(() => {
      res.redirect(`/campgrounds/${req.params.id}`);
    })
    .catch(() => {
      res.redirect('back');
    });
});
//comment destroy route
router.delete('/:comment_id', middlewre.checkCommentOwnership, (req, res) => {
  comment
    .findByIdAndRemove(req.params.comment_id)
    .then(() => {
      res.redirect(`/campgrounds/${req.params.id}`);
    })
    .catch(() => {
      res.redirect('back');
    });
});

module.exports = router;
