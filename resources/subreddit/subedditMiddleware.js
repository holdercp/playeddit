const axios = require('axios');
const querystring = require('querystring');

// Axios instance
const axiosReddit = axios.create({
  baseURL: 'https://oauth.reddit.com',
  headers: {
    'User-Agent': 'web:playeddit:v0.0.0 (by /u/holdercp)',
  },
});

const search = (req, res, next) => {
  const { query } = req.query;

  // Configure axios request
  const searchSubreddits = {
    url: '/api/search_subreddits',
    method: 'post',
    data: querystring.stringify({
      query,
      exact: false,
      include_over_18: false,
      include_unadvertisable: true,
    }),
    headers: { Authorization: `Bearer ${req.session.reddit.accessToken}` },
  };

  axiosReddit
    .request(searchSubreddits)
    .then((response) => {
      res.json(response.data);
    })
    .catch(err => next(err));
};

// Returns an array of Spotify track objects
const getTracks = (req, res, next) => {
  // Axios config
  const getHotListings = {
    url: `/r/${req.params.subreddit}/hot`,
    headers: { Authorization: `Bearer ${req.session.reddit.accessToken}` },
    transformResponse: [
      (data) => {
        const resData = JSON.parse(data);

        // Format: <song> - <artist>
        const songAndArtist = /[A-Za-z0-9] - [A-Za-z0-9]/;

        // Filter by correct format and return a new object of id and title
        const tracks = resData.data.children
          .filter(listing => songAndArtist.test(listing.data.title))
          .map(listing => ({ id: listing.data.id, title: listing.data.title }));

        return tracks;
      },
    ],
  };

  // Searches for Spotify track, returns a Promise of a Track obj or null if not found
  const getSpotifyTrack = (track) => {
    // Axios config
    const searchSpotifyTracks = {
      url: 'https://api.spotify.com/v1/search',
      params: {
        q: track.title,
        type: 'track',
        market: 'US',
        limit: 1,
      },
      headers: {
        Authorization: `Bearer ${req.session.passport.user.accessToken}`,
      },
      transformResponse: [
        // Return the track item or null if the search returned no result
        (data) => {
          const resData = JSON.parse(data);
          return resData.tracks.items.length > 0 ? resData.tracks.items[0] : null;
        },
      ],
    };

    return axios.request(searchSpotifyTracks).then(response => response.data);
  };

  axiosReddit
    .request(getHotListings)
    .then(response => response.data.map(getSpotifyTrack))
    .then(spotifyTracks => Promise.all(spotifyTracks))
    .then((values) => {
      // Filter out null results
      const matchedTracks = values.filter(track => track);

      res.json(matchedTracks);
    })
    .catch(err => next(err));
};

module.exports = {
  search,
  getTracks,
};
