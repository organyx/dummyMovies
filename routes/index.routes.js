const express = require('express');
const router = express.Router();

router.use('/api/movies', require('./movie.routes'));

module.exports = router;
