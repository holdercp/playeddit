const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const { passport } = require('./auth');

const indexRouter = require('./routes/index');
const playlistRouter = require('./resources/playlist').router;
const subredditRouter = require('./resources/subreddit').router;
const authRouter = require('./auth').router;

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
app.use('/auth', authRouter);
app.use('/playlist', playlistRouter);
app.use('/subreddit', subredditRouter);

module.exports = app;
