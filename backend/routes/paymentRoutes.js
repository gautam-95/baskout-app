const express = require("express");
const router = express.Router();
const validateAuth = require("../middleware/validate-auth");

const PaymentController = require("../controllers/payment");

router.post("/create", validateAuth, PaymentController.makePaymentIntent);

module.exports = router;
