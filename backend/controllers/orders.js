const User = require("../models/user");

exports.addOrderToUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.userId },
    { $push: { orders: req.body.orders[0] } }
  )
    .then((result) => {
      res.status(200).json({
        message: "Order added for user successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error adding orders",
      });
    });
};

exports.getUserOrders = (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .populate({
      path: "orders",
      populate: {
        path: "products",
        model: "Product",
      },
    })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "User not found",
        });
      }
      res.status(200).json({
        message: "Orders fetched successfully",
        orders: result.orders,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error fetching records",
      });
    });
};
