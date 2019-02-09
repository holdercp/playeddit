const router = require('express').Router();
const mw = require('./subedditMiddleware');
const authMW = require('../../auth').middleware;

router.use(authMW.authReddit);

router.get('/search', mw.search);

router.get('/:subreddit', mw.getTracks);

module.exports = router;
