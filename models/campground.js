const mongoose = require('mongoose');

const camproundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Campground = mongoose.model('Campground', camproundSchema);
module.exports = Campground;
