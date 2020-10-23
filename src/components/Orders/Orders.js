import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Order from "./Order/Order";
import styles from "./Orders.module.scss";
import * as paymentOrderActions from "../../store/actions/paymentOrders";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useHistory } from "react-router-dom";

const Orders = (props) => {
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.payment.orders);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      dispatch(paymentOrderActions.fetchOrders(user.userId));
    }
  }, [user, dispatch]);

  return (
    <div className={styles.orders}>
      <h1> Your orders </h1>
      <div>
        {orders
          ?.sort((a, b) => (a.created < b.created ? 1 : -1))
          .map((order, idx) => (
            <Order key={idx} order={order} />
          ))}
      </div>
      {orders.length === 0 && (
        <div
          onClick={() => history.push("/")}
          className={styles.noOrdersSection}
        >
          <AddShoppingCartIcon className={styles.shoppingIcon} />
          <h3>Start Adding some items to your basket!</h3>
        </div>
      )}
    </div>
  );
};

export default Orders;
