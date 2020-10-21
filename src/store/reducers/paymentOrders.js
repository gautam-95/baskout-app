import * as actionTypes from "../actions/actionTypes";

const initialState = {
  paymentSecret: null,
  orders: [],
  succeeded: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAYMENT_SECRET:
      return {
        ...state,
        paymentSecret: action.secret,
      };
    case actionTypes.SAVE_ORDER_SUCCESS:
      return {
        ...state,
        succeeded: true,
        error: null,
      };
    case actionTypes.SAVE_ORDER_FAIL:
      return {
        ...state,
        succeeded: false,
        error: action.message,
      };

    case actionTypes.SET_USER_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };

    case actionTypes.FETCH_USER_ORDERS_FAIL:
      return {
        ...state,
        error: action.message,
      };

    case actionTypes.RESET_SUCCEEDED:
      return {
        ...state,
        succeeded: false,
      };
    default:
      return state;
  }
};

export default reducer;
