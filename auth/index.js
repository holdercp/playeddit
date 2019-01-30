const passport = require('./passportConfig');
const router = require('./authRouter');
const middleware = require('./authMiddleware');

module.exports.passport = passport;
module.exports.router = router;
module.exports.middleware = middleware;
