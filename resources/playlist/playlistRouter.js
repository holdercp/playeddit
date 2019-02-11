const router = require('express').Router();
const mw = require('./playlistMiddleware');
const authMW = require('../../auth').middleware;

router.use(authMW.refreshSpotify);

router.get('/', mw.getPlaylists);

router.post('/:playlistId/addTracks', mw.addTracks);

module.exports = router;
