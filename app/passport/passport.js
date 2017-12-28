var passport      = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(function(username, password, done) {
    if (username == process.env.USERNAME && password == process.env.PASSWORD) {
        return done(null, true);
	}
	return done(null, false);
}));

module.exports = passport;