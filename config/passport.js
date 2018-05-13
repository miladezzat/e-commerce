var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
  fname: 'fname',
  usernameField: 'email',
  passwordField: 'password',
  permation: 'permation',
  passReqToCallback: true
}, function(req, email, passowrd, done){
  req.checkBody('email','Email Field must be empty').notEmpty();
  req.checkBody('email','Error Email, Please Enter a valid email').isEmail();
  req.checkBody('password','password Field must be empty').notEmpty();
  req.checkBody('email','Passowrd must be at least 8 characters').isLength({min: 8});
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, function (err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false, {message: 'Email is already in use.'});
    }
    var newUser = new User();
    newUser.email = email;
    newUser.permation = req.body.permation;
    newUser.fname = req.body.fname;
    newUser.password = newUser.encryptPasswprd(passowrd);
    newUser.save(function(err, result){
      if (err) {
        return done(err);
      }else {
        return done(null, newUser);
      }
    });
  });
}));

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, passowrd, done){
  req.checkBody('email','Email Field must be empty').notEmpty();
  req.checkBody('email','Error Email, Please Enter a valid email').isEmail();
  req.checkBody('password','password Field must be empty').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {message: 'User Not Found.'});
    }
    if (!user.validPassword(passowrd)) {
      return done(null, false, {message: 'Wrong Password.'});
    }
    return done(null, user);
  });
}));
