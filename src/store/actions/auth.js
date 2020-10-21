import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios";
import * as actions from './product';

export const authStart = () => {
    return {
      type: actionTypes.AUTH_START,
    };
  };
  
  export const authSuccess = (email, userId) => {
    return {
      type: actionTypes.AUTH_SUCCESS,
      payload: {
        email,
        userId
      },
    };
  };
  
  export const authFail = (message) => {
    return {
      type: actionTypes.AUTH_FAIL,
      message,
    };
  };
  
  export const logout = () => {
    localStorage.clear();
    return {
      type: actionTypes.AUTH_LOGOUT,
    };
  };
  
  export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
      setTimeout(() => {
        dispatch(logout());
      }, expirationTime * 1000);
    };
  };
  
  export const auth = (email, password, isSignup) => {
    return (dispatch) => {
      dispatch(authStart());
      const authData = {
        email,
        password,
      };
      let url = isSignup ? "/auth/signUp" : "/auth/login";
      axios
        .post(url, authData)
        .then((res) => {
          if (isSignup) {
            dispatch(authSuccess(email, res.data.userId));
          } else {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("userEmail", email);
            const expirationDt = new Date(
              new Date().getTime() + res.data.expiresIn * 1000
            );
            localStorage.setItem("expirationDate", expirationDt);
            dispatch(authSuccess(email, res.data.userId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
          }
        })
        .catch((err) => {
          dispatch(authFail(err.response.data));
        });
    };
  };

  export const autoLogin = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const email = localStorage.getItem("userEmail");
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(email, userId));
        dispatch(actions.fetchProducts());
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};