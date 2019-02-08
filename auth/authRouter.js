const router = require('express').Router();
const passport = require('./passportConfig');
const User = require('../resources/user').model;

router.get(
  '/spotify',
  passport.authenticate('spotify', {
    scope: ['playlist-modify-private', 'playlist-modify-public', 'playlist-read-private'],
  }),
  () => {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  },
);

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: 'http://localhost:3000/',
  }),
  (req, res, next) => {
    // Successful authentication, get user info and redirect to playlists.
    User.findOne({ spotifyId: req.session.passport.user.id }, (err, user) => {
      if (!user) return next(err);

      res.cookie('name', user.displayName);
      return res.redirect('http://localhost:3000/playlists');
    });
  },
);

module.exports = router;
