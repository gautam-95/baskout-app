import React from "react";
import styles from "./Sidebar.module.scss";
import SidebarItem from "./SidebarItem/SidebarItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Sidebar = ({ user, itemClicked, onLogout }) => {
  return (
    <div className={styles.sideBar}>
      <Link className={styles.brand} to="/">
        <img src={logo} alt="Amazon" onClick={itemClicked} />
      </Link>
      <span>{user ? user.email : "Guest"}</span>
      <div>
        <SidebarItem
          Icon={ListAltIcon}
          item="Your Orders"
          itemClicked={itemClicked}
          link="/orders"
        />
        <SidebarItem
          onLogout={onLogout}
          Icon={ExitToAppIcon}
          item={user ? "Sign out" : "Sign in"}
          // link="/login"
        />
      </div>
    </div>
  );
};

export default Sidebar;
