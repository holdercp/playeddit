const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: '518406354a4c4a939234351554badffc',
      clientSecret: '60dec744d3974ea19b4ec8ba02b87c0f',
      callbackURL: 'http://localhost:3000/auth/spotify/callback',
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      // Add access token for subsequent API requests
      const user = {
        id: profile.id,
        accessToken,
      };

      done(null, user);
    },
  ),
);

module.exports = passport;
