import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Auth/Login";
import Payment from "./components/Checkout/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders/Orders";
import ProductDetail from "./components/Product/ProductDetail/ProductDetail";
import { useDispatch } from "react-redux";
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import * as authActions from './store/actions/auth';


const promise = loadStripe(
  "pk_test_51HZhF4IwctVdRKB8sAwzd5kp7QoWTRg1iSkCJ26Lewrwf16hiVwrAYSSxRXZIikpFek93DBrZu1dlT54fBZPvukN0072mS0vtt"
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.autoLogin());
  });

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/product/:id">
            <Header />
            <ProductDetail />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
        <NotificationContainer />
      </div>
    </Router>
  );
}

export default App;
