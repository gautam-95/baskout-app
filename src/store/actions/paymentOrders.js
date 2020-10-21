import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios";
import { getBasketTotal } from "../../context/reducer";

export const setPaymentSecret = (secret) => {
  return {
    type: actionTypes.SET_PAYMENT_SECRET,
    secret,
  };
};

export const generatePaymentSecret = (basket) => {
  return (dispatch) => {
    axios
      .post(
        `/payments/create?total=${Math.round(getBasketTotal(basket) * 100)}`,
        null
      )
      .then((response) => {
        dispatch(setPaymentSecret(response.data.clientSecret));
      });
  };
};

export const saveOrderSuccess = () => {
  return {
    type: actionTypes.SAVE_ORDER_SUCCESS,
  };
};

export const saveOrderFail = (message) => {
  return {
    type: actionTypes.SAVE_ORDER_FAIL,
    message,
  };
};

export const saveOrder = (payload) => {
  return (dispatch) => {
    axios
      .post(`/orders/update`, payload)
      .then((response) => {
        dispatch(saveOrderSuccess());
      })
      .catch((err) => {
        dispatch(saveOrderFail(err.response.data));
      });
  };
};

export const setUserOrders = orders => {
  return {
    type: actionTypes.SET_USER_ORDERS,
    orders
  }
};

export const setUserOrdersFail = message => {
  return {
    type: actionTypes.FETCH_USER_ORDERS_FAIL,
    message
  }
}

export const fetchOrders = (userId) => {
  return (dispatch) => {
    axios.get(`/orders/${userId}`)
    .then(res => {
      dispatch(setUserOrders(res.data.orders));
    })
    .catch(err => {
      console.log(err);
      dispatch(setUserOrdersFail(err.response.data))
    });
  };
};
