const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const session = require('express-session');
const axios = require('axios');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'cats', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: '518406354a4c4a939234351554badffc',
      clientSecret: '60dec744d3974ea19b4ec8ba02b87c0f',
      callbackURL: 'http://localhost:3000/auth/spotify/callback',
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      // Add access token for subsequent API requests
      const user = {
        id: profile.id,
        accessToken,
      };

      done(null, user);
    },
  ),
);

app.get('/auth/spotify', passport.authenticate('spotify'), (req, res) => {
  // The request will be redirected to spotify for authentication, so this
  // function will not be called.
});

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.json({
      msg: 'success!',
      session: req.session,
    });
  },
);

app.get('/api/playlist', (req, res, next) => {
  axios
    .get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${req.session.passport.user.accessToken}`,
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch(err => next(err));
});

module.exports = app;
