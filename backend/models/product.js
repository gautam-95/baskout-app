const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    // id: Math.floor(Math.random() * 1000) + 1,
    title: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String},
    rating: {type: Number},
    details: [
      {type: String}
    ]
});

module.exports = mongoose.model('Product', productSchema);