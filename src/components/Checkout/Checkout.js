import React from "react";
import { useSelector } from "react-redux";
import BasketItem from "./BasketItem/BasketItem";
import styles from "./Checkout.module.scss";
import Subtotal from "./Subtotal/Subtotal";
import checkoutBanner from '../../assets/images/checkout.jpg'

const Checkout = (props) => {
  const basket = useSelector(state => state.products.basket);
  const user = useSelector(state => state.auth.user);

  return (
    <div className={styles.checkout}>
      <div>
        <img
          className={styles.ad}
          src={checkoutBanner}
          alt="advertisement"
        />
        <div>
          <h3>Hello {user?.email}</h3>
          <h2 className={styles.title}>Your Shopping Basket</h2>
          {/* <FlipMove> */}
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
          {/* </FlipMove> */}
        </div>
      </div>
      <div>
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
