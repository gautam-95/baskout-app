import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebase";
import Order from "./Order/Order";
import styles from "./Orders.module.scss";
import * as paymentOrderActions from "../../store/actions/paymentOrders";

const Orders = (props) => {
  // const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.payment.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(paymentOrderActions.fetchOrders(user.userId));
      // db.collection("users")
      //   .doc(user?.uid)
      //   .collection("orders")
      //   .orderBy("created", "desc")
      //   .onSnapshot((snapshot) => {
      //     setOrders(
      //       snapshot.docs.map((doc) => ({
      //         id: doc.id,
      //         data: doc.data(),
      //       }))
      //     );
      //   });
    }
    // else {
    //   setOrders([]);
    // }
  }, [user, dispatch]);

  return (
    <div className={styles.orders}>
      <h1> Your orders </h1>
      <div>
        {orders?.map((order, idx) => (
          <Order key={idx} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
