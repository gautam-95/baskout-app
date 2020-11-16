import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import BasketItem from "../BasketItem/BasketItem";
import styles from "./Payment.module.scss";
import { useDispatch, useSelector } from "react-redux";
import * as paymentOrderActions from "../../../store/actions/paymentOrders";
import { NotificationManager } from "react-notifications";
import { getBasketTotal } from "../../../store/reducers/products";

const Payment = (props) => {
  const basket = useSelector((state) => state.products.basket);
  const user = useSelector((state) => state.auth.user);
  const clientSecret = useSelector((state) => state.payment.paymentSecret);
  const succeeded = useSelector((state) => state.payment.succeeded);
  const dispatch = useDispatch();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");

  useEffect(() => {
    if (succeeded) {
      setProcessing(false);
      dispatch({
        type: "EMPTY_BASKET",
      });
      dispatch({
        type: "RESET_SUCCEEDED",
      });
      NotificationManager.info(`Order placed successfully!`, `Yay!`, 3000);
      history.replace("/orders");
    }
    // generate stripe secret which allows to charge a customer
    dispatch(paymentOrderActions.generatePaymentSecret(basket));
  }, [basket, dispatch, succeeded, history]);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        const payload = {
          userId: user.userId,
          orders: [
            {
              paymentId: paymentIntent.id,
              products: basket.map((item) => item.id),
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            },
          ],
        };
        dispatch(paymentOrderActions.saveOrder(payload));
      });
  };

  const handleChange = (e) => {
    setError(e.error ? e.error.message : "");
    setDisabled(e.empty || e.error);
  };

  return (
    <div className={styles.payment}>
      <div className={styles.container}>
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div>
          <div className={styles.title}>
            <h3>Delivery Address</h3>
          </div>
          <div className={styles.address}>
            <p>{user?.email}</p>
            <p>F-123, React Street</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div>
          <div className={styles.title}>
            <h3>Review items and delivery</h3>
          </div>
          <div className={styles.items}>
            {basket.map((item) => (
              <BasketItem
                key={item.id + Math.floor(Math.random() * 1000) + 1}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
        <div>
          <div className={styles.title}>
            <h3>Payment Method</h3>
          </div>
          <div className={styles.details}>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div>
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
                <div className={styles.helpText}>
                  Use<span> 4242 4242 4242 4242 | Any future Date | Any 3 digits </span>for
                  test
                </div>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
