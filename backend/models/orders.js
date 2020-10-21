const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  paymentId: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  amount: { type: Number },
  created: { type: String }
});

module.exports = mongoose.model("Order", orderSchema);
