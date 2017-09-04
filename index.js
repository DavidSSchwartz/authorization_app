var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.json({
	type: "application/json";
}))


app.configure(function() {
	app.use(express.static('public'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({
		secret: 'keyboard cat'
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
});
// requires the model with Passport-Local Mongoose plugged in
const User = require('./models/user');

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({
			username: username
		}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message: 'Incorrect username.'
				});
			}
			if (!user.validPassword(password)) {
				return done(null, false, {
					message: 'Incorrect password.'
				});
			}
			return done(null, user);
		});
	}
));



app.use(express.static(path.join(__dirname, 'public')));

app.post('/userinfo', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/userinfo',
	failureFlash: true
}));



console.log('Listening on port: ' + (process.env.PORT || 3000));
app.listen(process.env.PORT || 3000)