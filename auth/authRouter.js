const router = require('express').Router();
const axios = require('axios');
const querystring = require('querystring');
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

router.get('/reddit', (req, res, next) => {
  axios
    .post(
      'https://www.reddit.com/api/v1/access_token',
      querystring.stringify({
        grant_type: 'client_credentials',
        scope: 'read',
      }),
      // These need to be in env vars
      {
        auth: {
          username: '3svT7_TDXxJzMQ',
          password: 'EM-TyEJmwe4F-3ZGdMqrl4bD6Mo',
        },
      },
    )
    .then((response) => {
      req.session.reddit = {
        accessToken: response.data.access_token,
      };
      res.send(req.session);
    })
    .catch(err => next(err));
});

module.exports = router;
