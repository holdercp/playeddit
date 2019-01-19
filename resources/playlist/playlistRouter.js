const router = require('express').Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  axios
    .get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${req.session.passport.user.accessToken}`,
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch(err => next(err));
});

module.exports = router;
