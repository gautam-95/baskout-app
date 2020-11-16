import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styles from "./SidebarItem.module.scss";

const SidebarItem = ({ Icon, item, itemClicked, link, onLogout }) => {
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();

  const onItemClick = () => {
    if (item === "Sign out" || item === "Sign in") {
      if (user) {
      } else {
        history.push("/login");
      }
      onLogout();
    } else {
      itemClicked();
    }
  };

  return (
    <div className={styles.sideBarItem} onClick={onItemClick}>
      <Link activeClassName={styles.active} to={link} className={styles.link}>
        <Icon className={styles.Icon} />
        <span> {item}</span>
      </Link>
    </div>
  );
};

export default SidebarItem;
