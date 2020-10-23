const express = require("express");
const router = express.Router();
const validateAuth = require("../middleware/validate-auth");

const OrderController = require("../controllers/orders");

router.get("/:userId", OrderController.getUserOrders);
router.post("/update", validateAuth, OrderController.addOrderToUser);

module.exports = router;
