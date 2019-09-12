import Litedom from '//unpkg.com/litedom';

Litedom({
  el: '#container',
  data: {
    name: 'dummyMovies',
    movieList: [],
    default: { title: 'title', genre: 'genre' },
    selectedMovie: { title: 'title', genre: 'genre' },
    showSelectedMovie: false,
    error: {},
    showError: false,
  },
  created() {
    this.refreshMovieList();
  },
  deleteMovie(event) {
    axios
      .delete(`/api/movies/${event.target.attributes[1].value}`)
      .then(res => {
        console.log(res);
        this.refreshMovieList();
      })
      .catch(err => {
        console.log(err);
      });
  },
  addMovie(event) {
    axios
      .post(`/api/movies`, {
        title: event.target.form[0].value,
        genre: event.target.form[1].value,
      })
      .then(res => {
        console.log(res);
        this.refreshMovieList();
      })
      .catch(err => {
        console.log(err);
      });
  },
  updateMovie(event) {
    axios
      .put(`/api/movies/${event.target.attributes[3].value}`, {
        title: event.target.form[0].value,
        genre: event.target.form[1].value,
      })
      .then(res => {
        console.log(res);
        this.refreshMovieList();
      })
      .catch(err => {
        console.log(err);
      });
  },
  getMovie(event) {
    axios
      .get(`/api/movies/${event.target.attributes[0].value}`)
      .then(response => {
        this.data.selectedMovie = response.data;
        this.data.showSelectedMovie = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  refreshMovieList() {
    axios
      .get('/api/movies')
      .then(response => {
        this.data.movieList = response.data;
        this.closeMovie();
      })
      .catch(err => {
        console.log(err);
      });
  },
  closeMovie() {
    this.data.showSelectedMovie = false;
    this.clearInput();
  },
  clearInput() {
    this.data.selectedMovie = { title: 'title', genre: 'genre' };
  },
});
