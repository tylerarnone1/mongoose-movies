var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/movies')

router.get('/movies', moviesCtrl.getAllMovie);
router.post('/movies', moviesCtrl.createMovie);
router.delete('/movie/:id', moviesCtrl.deleteMovie);
router.put('/movie/:id', moviesCtrl.updateMovie);


router.get('/', function(req, res, next) {
  res.redirect('/movies');
});

module.exports = router;
