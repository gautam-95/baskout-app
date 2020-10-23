import React from "react";
import styles from "./Order.module.scss";
import moment from "moment";
import BasketItem from "../../Checkout/BasketItem/BasketItem";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {
  return (
    <div className={styles.order}>
      <div>
        <h3 className={styles.orderTitle}>Order #{order._id}</h3>
        <p className={styles.paymentId}>
          <h4>Payment Id</h4>
          <small>{order.paymentId}</small>
        </p>
      </div>

      <p>{moment.unix(order.created).format("MMMM Do YYYY, h:mma")}</p>
      <div className={styles.items}>
        {order.products?.map((item) => (
          <BasketItem
            key={item._id + +Math.floor(Math.random() * 1000) + 1}
            id={item._id}
            title={item.title}
            rating={item.rating}
            price={item.price}
            image={item.image}
            hideButton
          />
        ))}
      </div>

      <CurrencyFormat
        renderText={(value) => (
          <h3 className={styles.orderTotal}>Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
};

export default Order;
