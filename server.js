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
app.use('/playlist', playlistRouter);
app.use('/subreddit', subredditRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build, index.html'));
  });
}

// global error handler
// app.use((err, req, res) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     message: err.message,
//     error: {},
//   });
// });

module.exports = app;
