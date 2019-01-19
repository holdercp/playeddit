const router = require('express').Router();
const passport = require('./passportConfig');

router.get('/spotify', passport.authenticate('spotify'), () => {
  // The request will be redirected to spotify for authentication, so this
  // function will not be called.
});

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

module.exports = router;
