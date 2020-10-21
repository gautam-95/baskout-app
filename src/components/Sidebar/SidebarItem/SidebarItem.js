import React from "react";
import { Link } from "react-router-dom";
import styles from "./SidebarItem.module.scss";

const SidebarItem = ({ Icon, item, itemClicked, link }) => {
  return (
    <div className={styles.sideBarItem} onClick={itemClicked}>
      <Link activeClassName={styles.active} to={link} className={styles.link}>
        <Icon className={styles.Icon} />
        <span> {item}</span>
      </Link>
    </div>
  );
};

export default SidebarItem;
