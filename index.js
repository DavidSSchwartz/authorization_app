var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var mongoose = require('mongoose');
var row = require('./database/db');


app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
	secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());

// requires the model with Passport-Local Mongoose plugged in


// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(row.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(row.serializeUser());
passport.deserializeUser(row.deserializeUser());


passport.use(new LocalStrategy(
	function(username, password, done) {
		row.findOne({
			username: username
		}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!username) {
				return done(null, false, {
					message: 'Incorrect username.'
				});
			}
			if (!username.validPassword(password)) {
				return done(null, false, {
					message: 'Incorrect password.'
				});
			}
			return done(null, user);
		});
	}
));



app.use(express.static(path.join(__dirname, '/public/pages')));
app.use(express.static(path.join(__dirname, '/sweetalert/dist')));


app.get('/registration', function(req, res, next) {


	console.log(req.body);
	res.status(200).send({});
})

app.post('/userinfo', function(req, res, next) {



	var Row = mongoose.model('Row');


	Row.register(new Row({
		username: req.body.username
	}), req.body.password, function(err, account) {
		if (err) {
			console.log(err);
		}

		passport.authenticate('local')(req, res, function() {
			res.redirect('/');
		});
	});



		res.send(req.body);

	// passport.authenticate('local', {
	// 	successRedirect: '/',
	// 	failureRedirect: '/userinfo',
	// 	failureFlash: true
	// })



});



console.log('Listening on port: ' + (process.env.PORT || 3000));
app.listen(process.env.PORT || 3000)