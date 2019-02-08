require('dotenv').config();
require('./db/config');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const { passport } = require('./auth');

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
    secret: 'cats', resave: true, saveUninitialized: true, cookie: { httpOnly: false },
  }),
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/playlist', playlistRouter);
app.use('/subreddit', subredditRouter);

module.exports = app;
