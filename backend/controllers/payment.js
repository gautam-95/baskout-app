const stripe = require("stripe")(
    "sk_test_51HZhF4IwctVdRKB8EsDIMkBnWtMlvnFfaHtx6B17nFJzemN17y9cgQYXrugnihoQQKYGzEOrQxAwuXR5UwlSm7B800ZRAmWeZB"
  );

exports.makePaymentIntent = (req, res) => {
  const total = req.query.total;
  let paymentIntent = null;
  stripe.paymentIntents
    .create({
      amount: total,
      currency: "inr",
    })
    .then((response) => {
      paymentIntent = response;
      // OK - Created
      return res.status(201).send({
        clientSecret: paymentIntent.client_secret,
      });
    })
    .catch((err) => {
        return res.status(500).send({
            message: 'Payment creation failed',
          });
    });
};
