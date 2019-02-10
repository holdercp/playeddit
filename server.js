require('dotenv').config();
require('./db/config');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const crypto = require('crypto');
const { passport } = require('./auth');
const { checkAuth } = require('./auth').middleware;

const playlistRouter = require('./resources/playlist').router;
const subredditRouter = require('./resources/subreddit').router;
const authRouter = require('./auth').router;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: crypto.randomBytes(256).toString('hex'),
    resave: true,
    saveUninitialized: false,
    cookie: { httpOnly: false },
  }),
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

// Check auth before accessing resources
app.use(checkAuth);
app.use('/playlist', playlistRouter);
app.use('/subreddit', subredditRouter);

// global error handler
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

module.exports = app;
