const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("DB Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/test", (req, res) => {
  res.json({
    msg: "A MERN Stack project",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", orderRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running!");
});
