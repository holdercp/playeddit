const router = require('express').Router();
const mw = require('./subedditMiddleware');

router.get('/search', mw.search);

router.get('/:subreddit', mw.getTracks);

module.exports = router;
