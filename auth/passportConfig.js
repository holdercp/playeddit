const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('../resources/user').model;

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
    (accessToken, refreshToken, expires_in, profile, done) => {
      const expires = Date.now() + expires_in * 1000;

      console.log(profile);

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
        { upsert: true },
        (err, user) => {
          if (err) return done(err, user);

          // Add access token for subsequent API requests
          const userSession = {
            id: profile.id,
            accessToken,
          };

          return done(null, userSession);
        },
      );
    },
  ),
);

module.exports = passport;
