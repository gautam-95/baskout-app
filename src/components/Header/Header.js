import React, { useState } from "react";
import styles from "./Header.module.scss";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Sidebar from "../Sidebar/Sidebar";
import * as authActions from "../../store/actions/auth";

const Header = (props) => {
  const basket = useSelector((state) => state.products.basket);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();

  const handleAuth = () => {
    if (user) {
      dispatch(authActions.logout());
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsSidebarOpen(open);
  };

  return (
    <div
      className={styles.header}
      style={{
        backgroundColor:
          location.pathname !== "/"
            ? "rgba(79, 158, 150, 0.85)"
            : "transparent",
      }}
    >
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleDrawer("left", false)}
      >
        <Sidebar user={user} onLogout={() => handleAuth()} itemClicked={() => setIsSidebarOpen(false)} />
      </Drawer>

      <div className={styles.alignCenter}>
        <MenuIcon
          className={styles.MenuIcon}
          onClick={toggleDrawer("left", true)}
        />
        <Link className={styles.brand} to="/">
          <img src={logo} alt="Baskout" />
          <span>baskout</span>
        </Link>
      </div>
      <div className={styles.nav}>
        <Link to={!user && "/login"}>
          <div onClick={handleAuth} className={styles.option}>
            <span>Hello {user ? user.email : "Guest"}</span>
            <span>{user ? "Sign out" : "Sign in"}</span>
          </div>
        </Link>
        {user ? (
          <Link to="/orders">
            <div className={styles.option}>
              <span>Your</span>
              <span>Orders</span>
            </div>
          </Link>
        ) : null}
        <Link to="/checkout">
          <div className={styles.optionBasket}>
            <ShoppingBasketIcon />
            <span className={styles.optionBasketCount}>{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
