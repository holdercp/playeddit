const axios = require('axios');
const qs = require('querystring');
const utils = require('../utilities/utils');
const User = require('../resources/user').model;

// Updates the reddit access token if expired
// Should run before any mw that calls the reddit API
module.exports.authReddit = (req, res, next) => {
  if (req.session.reddit && req.session.reddit.expires > Date.now()) {
    next();
  } else {
    axios
      .post(
        'https://www.reddit.com/api/v1/access_token',
        qs.stringify({
          grant_type: 'client_credentials',
          scope: 'read',
        }),
        {
          auth: {
            username: process.env.REDDIT_CLIENT,
            password: process.env.REDDIT_SECRET,
          },
        },
      )
      .then((response) => {
        const expires = utils.fromNow(response.data.expires_in);

        req.session.reddit = {
          accessToken: response.data.access_token,
          expires,
        };

        next();
      })
      .catch(err => next(err));
  }
};

// Checks to see if client has been authed by Spotify
// If not, go through auth process
module.exports.checkAuth = (req, res, next) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    next();
  } else {
    res.clearCookie('connect.sid', { path: '/', httpOnly: false });
    const err = new Error('Access denied.');
    err.status = 401;
    next(err);
  }
};

// Requests a new access token from Spotify if current one is expired
module.exports.refreshSpotify = (req, res, next) => {
  if (req.session.passport && req.session.passport.user) {
    User.findOne({ spotifyId: req.session.passport.user.id }, (err, user) => {
      if (err) return next(err);

      if (!user) throw new Error('User not found.');

      if (user.token.expires <= Date.now()) {
        axios
          .post(
            'https://accounts.spotify.com/api/token',
            qs.stringify({
              grant_type: 'refresh_token',
              refresh_token: user.token.refresh,
            }),
            {
              auth: {
                username: process.env.SPOTIFY_ID,
                password: process.env.SPOTIFY_SECRET,
              },
            },
          )
          .then((response) => {
            // Set new access token and expires date
            const expires = utils.fromNow(response.data.expires_in);

            req.session.passport.user.accessToken = response.data.access_token;

            // eslint-disable-next-line no-param-reassign
            user.token.expires = expires;
            user.save();
            next();
          })
          .catch(error => next(error));
      }
      return next();
    });
  }
};
