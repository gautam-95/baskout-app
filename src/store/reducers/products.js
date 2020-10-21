import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  basket: [],
  products: null,
  selectedProduct: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case actionTypes.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product {id: ${action.id}} as its not in the basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    case actionTypes.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.products.map((product) => ({
          ...product,
          id: product._id,
        })),
      };
    case actionTypes.SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.product,
      };
    default:
      return state;
  }
};

export const getBasketTotal = (basket) =>
  basket?.reduce((acc, ele) => acc + ele.price, 0);

export default reducer;
