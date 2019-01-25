const axios = require('axios');
const querystring = require('querystring');

const axiosReddit = axios.create({
  baseURL: 'https://oauth.reddit.com',
  headers: {
    'User-Agent': 'web:playeddit:v0.0.0 (by /u/holdercp)',
  },
});

const search = (req, res, next) => {
  const { query } = req.query;

  axiosReddit
    .post(
      '/api/search_subreddits',
      querystring.stringify({
        query,
        exact: false,
        include_over_18: false,
        include_unadvertisable: true,
      }),
      {
        headers: { Authorization: `Bearer ${req.session.reddit.accessToken}` },
      },
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch(err => next(err));
};

const getListings = (req, res, next) => {
  axiosReddit
    .get(`/r/${req.params.subreddit}/hot`, {
      headers: { Authorization: `Bearer ${req.session.reddit.accessToken}` },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch(err => next(err));
};

module.exports = {
  search,
  getListings,
};
