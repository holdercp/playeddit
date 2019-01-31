const axios = require('axios');
const querystring = require('querystring');
const utils = require('../utilities/utils');

module.exports.authReddit = (req, res, next) => {
  if (req.session.reddit && req.session.reddit.expires < Date.now()) {
    next();
  } else {
    axios
      .post(
        'https://www.reddit.com/api/v1/access_token',
        querystring.stringify({
          grant_type: 'client_credentials',
          scope: 'read',
        }),
        {
          auth: {
            username: process.env.REDDIT_CLIENT,
            password: process.env.REDDIT_SECRET,
          },
        },
      )
      .then((response) => {
        const expires = utils.fromNow(response.data.expires_in);

        req.session.reddit = {
          accessToken: response.data.access_token,
          expires,
        };

        next();
      })
      .catch(err => next(err));
  }
};

module.exports.refreshSpotify = (req, res, next) => {};
