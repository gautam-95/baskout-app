import React from "react";
import styles from "./Subtotal.module.scss";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../../context/reducer";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Subtotal = (props) => {
  const history = useHistory();
  const basket = useSelector(state => state.products.basket);

  return (
    <div className={styles.subtotal}>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {`Subtotal (${basket.length} items): `} <strong>{value}</strong>
            </p>
            <small className={styles.gift}>
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
