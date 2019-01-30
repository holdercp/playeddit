// Returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC plus the number of seconds passed in as secs
module.exports.fromNow = secs => Date.now() + secs * 1000;
