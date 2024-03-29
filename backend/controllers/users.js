const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user");

exports.signUpUser = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
      orders: [],
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created",
          result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "User creation failed",
        });
      });
  });
};

exports.loginUser = (req, res) => {
  let fetchedUser = null;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "User not registered",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((authRes) => {
      if (!authRes) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.secret,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Invalid Authentication Credentials",
      });
    });
};
