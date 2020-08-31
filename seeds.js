const mongoose = require('mongoose');
const Campground = require('./models/campground');
// const Post=require('./models/post')
const Comment = require('./models/comment');
const data = [
  {
    name: 'Rishikesh Camp',
    image:
      'https://img.traveltriangle.com/blog/wp-content/uploads/2017/10/acj-1710-camping-in-rishikesh-3.jpg',
    description:
      ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos et corpor is  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos et corporis',
  },
  {
    name: 'Rama laha Camp',
    image:
      'https://img.traveltriangle.com/blog/wp-content/uploads/2017/10/acj-1710-camping-in-rishikesh-3.jpg',
    description:
      ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos et corpor is  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos et corporis',
  },
  {
    name: 'Desart Camp',
    image:
      'https://img.traveltriangle.com/blog/wp-content/uploads/2017/10/acj-1710-camping-in-rishikesh-3.jpg',
    description:
      ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos et corpor is  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos et corporis',
  },
];

const seedDb = () => {
  //remove all camp ground
  Campground.remove({})
    .then(() => {
      console.log('db removed');
      data.forEach((seed) => {
        return Campground.create(seed)
          .then((campground) => {
            console.log('campground added');
            //create comment
            return Comment.create({
              text: 'this place is greate ,but i wish there was internet',
              author: 'Arnab',
            })
              .then((comment) => {
                campground.comments.push(comment);
                campground.save();
                console.log('Comment created');
              })
              .catch(() => console.log('comment error'));
          })
          .catch(() => console.log('error'));
      });
    })
    .catch((e) => console.log(e));
};

module.exports = seedDb;
