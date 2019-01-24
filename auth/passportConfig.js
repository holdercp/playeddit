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
      clientID: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
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
