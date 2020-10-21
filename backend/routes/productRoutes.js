const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product');

router.get('/all', ProductController.getAllProducts);

module.exports = router;