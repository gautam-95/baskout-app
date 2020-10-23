const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  orders: [
    {
      orderId: String,
      paymentId: { type: String },
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      amount: Number,
      created: String,
    },
  ],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
