var Movie = require('../models/movie');
var Performer = require('../models/performer');

module.exports = {
  api,
  show,
  new: newMovie,
  create,
  getAllMovie,
  getOneMovie,
  createMovie,
  deleteMovie,
  updateMovie
};

function updateMovie(req, res){
  Movie.findByIdAndUpdate(req.pararm.id, req.body, {new: true}).then(function(movie){
      res.status(200).json(movie);
  });
}

function deleteMovie(req, res){
  Movie.findByIdAndRemove(req.params.id).then(function(movie){
      res.status(200).json(movie);
  });
}

function getOneMovie(req, res) {
  Movie.findById(req.params.id).then(function(movie){
      res.status(200).json(movie);
  });
}

function createMovie(req, res ){
Movie.create(req.body).then(function(movie){
res.status(201).json(movie);
})
}

function getAllMovie(req, res){
  Movie.find({}).then(function(movie){
      res.status(200).json(movie);
  });
}

function api(req, res) {
  Movie.find({}, function(err, movies) {
    res.render('movies/api', { title: 'All Movies', movies });
  });
}

function show(req, res) {
  Movie.findById(req.params.id)
  .populate('cast').exec(function(err, movie) {
    // Performer.find({}).where('_id').nin(movie.cast)
    Performer.find({_id: {$nin: movie.cast}})
    .exec(function(err, performers) {
      console.log(performers);
      res.render('movies/show', {
        title: 'Movie Detail', movie, performers
      });
    });
  });
}

function newMovie(req, res) {
  res.render('movies/new', { title: 'Add Movie' });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  var movie = new Movie(req.body);
  movie.save(function(err) {
    if (err) return res.redirect('/movies/new');
    // res.redirect('/movies');
    res.redirect(`/movies/${movie._id}`);
  });
}

