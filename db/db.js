const mongoose = require('mongoose');
// const seedDb = require('../seeds');
// seedDb();
mongoose.connect('mongodb://localhost/yelp_camp', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
