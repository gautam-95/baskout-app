const Product = require('../models/product');

exports.getAllProducts = (req, res) => {
    Product.find()
    .then(result => {
        if(!res) {
            res.status(404).json({
                message: 'Products not found'
            })
        }
        res.status(200).json({
            message: 'Products fetched successfully',
            products: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'An unknown error occurred'
        });
    })
}