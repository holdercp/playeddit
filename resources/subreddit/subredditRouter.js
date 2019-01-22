const router = require('express').Router();
const axios = require('axios');
const querystring = require('querystring');

router.get('/search', (req, res, next) => {
  axios
    .post(
      'https://oauth.reddit.com/api/search_subreddits',
      querystring.stringify({
        query: 'house',
        exact: false,
        include_over_18: false,
        include_unadvertisable: true,
      }),
      {
        headers: {
          Authorization: `Bearer ${req.session.reddit.accessToken}`,
          'User-Agent': 'web:playeddit:v0.0.0 (by /u/holdercp)',
        },
      },
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
