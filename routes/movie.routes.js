const express = require('express');
const router = express.Router();
const movie = require('../controllers/movie.controller');
const m = require('../helpers/middlewares');

/* All Movies */
router.get('/', async (req, res) => {
  await movie
    .getMovies()
    .then(movies => res.json(movies))
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

/* A movie by id */
router.get('/:id', m.mustBeInteger, async (req, res) => {
  const id = req.params.id;

  await movie
    .getMovie(id)
    .then(movie => res.json(movie))
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

/* Insert a new movie */
router.post('/', m.checkFieldsPost, async (req, res) => {
  await movie
    .insertMovie(req.body)
    .then(movie =>
      res.status(201).json({
        message: `The movie #${movie.id} has been created`,
        content: movie,
      })
    )
    .catch(err => res.status(500).json({ message: err.message }));
});

/* Update a movie */
router.put('/:id', m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
  const id = req.params.id;

  await movie
    .updateMovie(id, req.body)
    .then(movie =>
      res.json({
        message: `The movie #${id} has been updated`,
        content: movie,
      })
    )
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});

/* Delete a movie */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
  const id = req.params.id;

  await movie
    .deleteMovie(id)
    .then(movie =>
      res.json({
        message: `The movie #${id} has been deleted`,
        content: movie,
      })
    )
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
