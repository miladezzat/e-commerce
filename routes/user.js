var express = require('express');
var router = express.Router();
var csrf  = require('csurf');
var passport = require('passport');
var Order = require('../models/order');
var Cart = require('../models/cart');
var Product = require('../models/product');
var mongoose = require('mongoose');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next) {
  Order.find({user: req.user}, function(err, orders) {
    if (err) {
      return res.write('Error!');
    }
    if (req.user.permation == "1") {
      res.render('user/profile', {orders: orders});
      var cart;
      orders.forEach(function(order){
        cart= new Cart(order.cart);
        order.items = cart.generateArray();
      });
    }

    if (req.user.permation == "2") {
      Product.find({companyName: req.user.fname},function(err, docs){
        res.render('user/company',{ products: docs});
      });
    }


  });
});
router.get('/addproduct', isLoggedIn,function (req, res, next) {
  res.render('user/addproduct',{csrfToken: req.csrfToken()});
});

router.post('/addproduct', isLoggedIn,function (req, res, next) {
  var product = new Product({
     imagePath: req.body.image,
     title: req.body.name,
     description: req.body.description,
     price:  req.body.price,
     companyName: req.user.fname
   });

   product.save(function(err, result){
     if (err) {
       var messages = req.flash('error');
       res.redirect('user/addproduct', {messages: messages, hasErrors: messages.length > 0});
     }else {
       res.redirect('/user/profile');
     }
   });
});

router.get('/logout', isLoggedIn,function (req, res, next) {
  req.logout();
  req.session.cart = null;
  res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next){
  next();
});

/* GET Sign UP page. */
router.get('/signup', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
router.post('/signup', passport.authenticate('local.signup',{
  failureRedirect: '/user/signup',
  failureFlash: true
}), function (req, res) {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/user/profile');
  }
});
router.get('/signin', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin',{
  failureRedirect: '/user/signin',
  failureFlash: true
}), function (req, res) {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/');
  }
});

module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next){
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
