var Product = require('../models/product');
var mongoose = require('mongoose');

//const MongoClient = require('mongodb').MongoClient;
//import Mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/shoppings');
var db = mongoose.connection;
db.on('error', console.error.bind(console, ' connection error: '));
db.once('open', function(){
	console.log('connected');
});


var products = [
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    })
];

var done = 0;

for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result){
  	if (err) return console.error(err);
    done++;
    if (done === products.length) {
      exit();
    }
  });
}
function exit() {
  mongoose.disconnect();
}
