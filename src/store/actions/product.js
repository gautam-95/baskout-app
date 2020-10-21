import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios";

export const setProducts = (products) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_PRODUCTS,
      products,
    });
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    axios.get("/product/all").then((result) => {
      dispatch(setProducts(result.data.products));
    });
  };
};
