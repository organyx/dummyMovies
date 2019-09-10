let movies = require('../data/movies.json');
const helper = require('../helpers/helper.js');

function getMovies() {
  return new Promise((resolve, reject) => {
    if (movies.length === 0) {
      reject({
        message: 'Movie Database is empty',
        status: 202,
      });
    }

    resolve(movies);
  });
}

function getMovie(id) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(movies, id)
      .then(movie => resolve(movie))
      .catch(err => reject(err));
  });
}

function insertMovie(newMovie) {
  return new Promise((resolve, reject) => {
    const id = { id: helper.getNewId(movies) };
    const date = {
      createdAt: helper.newDate(),
      updatedAt: helper.newDate(),
    };
    newMovie = { ...id, ...date, ...newMovie };
    movies.push(newMovie);
    resolve(newMovie);
  });
}

function updateMovie(id, newMovie) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(movies, id)
      .then(movie => {
        const index = movies.findIndex(m => m.id == movie.id);
        id = { id: movie.id };
        const date = {
          createdAt: movie.createdAt,
          updatedAt: helper.newDate(),
        };
        movies[index] = { ...id, ...date, ...newMovie };
        resolve(movies[index]);
      })
      .catch(err => reject(err));
  });
}

function deleteMovie(id) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(movies, id)
      .then(() => {
        movies = movies.filter(m => m.id !== parseInt(id));
        resolve();
      })
      .catch(err => reject(err));
  });
}

module.exports = {
  insertMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
};
