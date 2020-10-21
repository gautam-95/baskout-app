const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/payment');

router.post('/create', PaymentController.makePaymentIntent);

module.exports = router;