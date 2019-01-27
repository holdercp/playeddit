const axios = require('axios');

const axiosSpotify = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

const getPlaylists = (req, res, next) => {
  const getSpotifyPlaylists = {
    url: '/me/playlists',
    method: 'get',
    headers: {
      Authorization: `Bearer ${req.session.passport.user.accessToken}`,
    },
  };
  axiosSpotify
    .request(getSpotifyPlaylists)
    .then((response) => {
      res.json(response.data);
    })
    .catch(err => next(err));
};

const addTracks = (req, res, next) => {
  const addTracksToPlaylist = {
    url: `/playlists/${req.params.playlistId}/tracks`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${req.session.passport.user.accessToken}`,
    },
    params: {
      uris: req.query.uris,
    },
  };
  axiosSpotify
    .request(addTracksToPlaylist)
    .then((response) => {
      res.json(response.data);
    })
    .catch(err => next(err));
};

module.exports = {
  getPlaylists,
  addTracks,
};
