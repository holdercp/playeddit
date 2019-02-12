const router = require('express').Router();
const mw = require('./subedditMiddleware');
const authMW = require('../../auth').middleware;
const { checkAuth } = require('../../auth').middleware;

router.use(checkAuth);

router.use(authMW.authReddit);

router.get('/search', mw.search);

router.get('/:subreddit', mw.getTracks);

module.exports = router;
