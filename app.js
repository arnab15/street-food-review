const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
let campGrounds = [
  {
    name: 'Everest Camp',
    image:
      'https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=795&q=80',
  },
  {
    name: 'Goa Camp',
    image:
      'https://lh3.googleusercontent.com/proxy/2DRABlTMXDWKIDqsR_0IvcMeJcT4bxZEvUUE1hx_H0PTcRussYJ6o-q8j5SjFvALMXQbwOz1TQkZdYj7aBR2xWWr7wJdDh-Yg_wD',
  },
  {
    name: 'Rishikesh Camp',
    image:
      'https://img.traveltriangle.com/blog/wp-content/uploads/2017/10/acj-1710-camping-in-rishikesh-3.jpg',
  },
  {
    name: 'Everest Camp',
    image:
      'https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=795&q=80',
  },
  {
    name: 'Goa Camp',
    image:
      'https://lh3.googleusercontent.com/proxy/2DRABlTMXDWKIDqsR_0IvcMeJcT4bxZEvUUE1hx_H0PTcRussYJ6o-q8j5SjFvALMXQbwOz1TQkZdYj7aBR2xWWr7wJdDh-Yg_wD',
  },
  {
    name: 'Rishikesh Camp',
    image:
      'https://img.traveltriangle.com/blog/wp-content/uploads/2017/10/acj-1710-camping-in-rishikesh-3.jpg',
  },
];
app.get('/', (req, res) => {
  res.render('landing.ejs');
});
app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', { campGrounds: campGrounds });
});
app.post('/campgrounds', (req, res) => {
  //get data from form add to campground array
  //redirect back to campground
  let name = req.body.name;
  let image = req.body.image;
  const newCampground = { name, image };
  campGrounds.push(newCampground);
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});
app.listen(3000, () => {
  console.log('app is running on port 3000');
});
