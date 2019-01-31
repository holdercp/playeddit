const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('../resources/user').model;
const utils = require('../utilities/utils');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      callbackURL: `${process.env.HOST}/auth/spotify/callback`,
    },
    (accessToken, refreshToken, expiresIn, profile, done) => {
      const expires = utils.fromNow(expiresIn);

      User.findOneAndUpdate(
        { spotifyId: profile.id },
        {
          spotifyId: profile.id,
          displayName: profile.displayName,
          profileUrl: profile.profileUrl,
          token: {
            refresh: refreshToken,
            expires,
          },
        },
        { upsert: true, new: true },
        (err, user) => {
          if (err) return done(err, user);

          // Add access token for subsequent API requests
          const userSession = {
            id: user.spotifyId,
            accessToken,
          };

          return done(null, userSession);
        },
      );
    },
  ),
);

module.exports = passport;
