const router = require('express').Router();
const mw = require('./subedditMiddleware');
const authMW = require('../../auth').middleware;

router.get('/search', authMW.authReddit, mw.search);

router.get('/:subreddit', authMW.authReddit, mw.getTracks);

module.exports = router;
