const router = require('express').Router();
const mw = require('./playlistMiddleware');

router.get('/', mw.getPlaylists);

router.get('/:playlistId/addTracks', mw.addTracks);

module.exports = router;
