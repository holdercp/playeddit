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

const getTrackTitles = (req, res, next) => {
  axiosReddit
    .get(`/r/${req.params.subreddit}/hot`, {
      headers: { Authorization: `Bearer ${req.session.reddit.accessToken}` },
    })
    .then((response) => {
      const songAndArtist = /[A-Za-z0-9] - [A-Za-z0-9]/;
      const trackTitles = response.data.data.children
        .filter(listing => songAndArtist.test(listing.data.title))
        .map(listing => listing.data.title);
      res.json(trackTitles);
    })
    .catch(err => next(err));
};

module.exports = {
  search,
  getTrackTitles,
};
