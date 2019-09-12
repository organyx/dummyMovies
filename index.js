// Import packages
const express = require('express');
const morgan = require('morgan');
// App
const app = express();
// Morgan
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(require('./routes/index.routes'));
// First route
app.get('/', (req, res) => {
  // res.json({ message: 'We are live' });
  res.render('index', { title: 'dummyMovies' });
});
// Route for unspecified endpoints
app.get('*', function(req, res) {
  res.status(404).json({ message: 'You are lost' });
});
const port = 3000;
// Starting server
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
