import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Login.module.scss";
import logoImg from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../store/actions/product";
import * as authActions from "../../store/actions/auth";
import NotificationManager from "react-notifications/lib/NotificationManager";

const Login = (props) => {
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(productActions.fetchProducts());
      history.push("/");
      NotificationManager.success(`You are logged in`, `Success`, 2000);
    }

    if (error) {
      NotificationManager.error(`${error.message}`, `Error`, 2000);
    }
  }, [user, history, error, dispatch]);

  const signIn = (e) => {
    e.preventDefault();
    dispatch(authActions.auth(email, password, false));
  };

  const register = (e) => {
    e.preventDefault();
    dispatch(authActions.auth(email, password, true));
  };

  return (
    <div className={styles.login}>
      <Link to="/">
        <img className={styles.logo} src={logoImg} alt="Baskout" />
      </Link>
      <div className={styles.container}>
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className={loading ? styles.signInBtnDisabled : styles.signInButton}
            onClick={signIn}
            disabled={loading}
          >
            Sign in
          </button>
        </form>
        <p>
          By Signing in you agree to the baskout Conditions of Use and Sale.
        </p>
        <button
          className={styles.registerButton}
          onClick={register}
          disabled={loading}
        >
          Create your Baskout accout
        </button>
        <span className={styles.helpText}>
          Use <span> user1@baskout.com/123456 </span>for Test user
        </span>
      </div>
    </div>
  );
};

export default Login;
