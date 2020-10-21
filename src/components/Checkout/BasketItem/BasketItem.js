import React from "react";
import { useDispatch } from "react-redux";
import styles from "./BasketItem.module.scss";

const BasketItem = ({ id, image, title, price, rating, hideButton }) => {
  const dispatch = useDispatch();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id,
    });
  };

  return (
    <div className={styles.basketItem}>
      <img src={image} alt={title} />
      <div>
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
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from basket</button>
        )}
      </div>
    </div>
  );
};

export default BasketItem;
