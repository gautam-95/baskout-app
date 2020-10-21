import { productsData } from "./productsData";

export const initialState = {
  basket: [],
  user: null,
  products: productsData,
  selectedProduct: null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((acc, ele) => acc + ele.price, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
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
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.products
      }
    case "SET_SELECTED_PRODUCT":
      return {
        ...state,
        selectedProduct: action.product,
      };
    default:
      return initialState;
  }
};

export default reducer;
