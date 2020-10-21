const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/orders');

router.get('/:userId', OrderController.getUserOrders);
router.post('/update', OrderController.addOrderToUser);

module.exports = router;