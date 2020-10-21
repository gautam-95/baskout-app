import React from "react";
import { useDispatch } from "react-redux";
import styles from "./Product.module.scss";
import { NotificationManager } from "react-notifications";

const Product = ({ id, title, image, price, rating, productClicked }) => {
  const dispatch = useDispatch();
  const addToBasket = (e) => {
    e.stopPropagation();
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
    NotificationManager.info(title,`Product added to basket`, 2000);
  };

  return (
    <div className={styles.product} onClick={productClicked}>
      <div className={styles.info}>
        <p>{title}</p>
        <p>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div>
          {Array(rating)
            .fill()
            .map((el, idx) => (
              <span key={idx} role="img" aria-label="star">
                &#11088;
              </span>
            ))}
        </div>
      </div>
      <img src={image} alt="Startup" />
      <button onClick={(event) => addToBasket(event)}>Add to Basket</button>
    </div>
  );
};

export default Product;
