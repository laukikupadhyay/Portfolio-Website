import styles from "./SideNav.module.css"
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function SideNav() {
  return (
    <div className={styles.sideNav}>
            <div className={styles.link}>My Account</div>
            <div className={styles.link}>Profile</div>
            <div className={styles.link}>Create Room</div>
            <div className={styles.link}>Manage Rooms</div>
            <div className={styles.link}>Manage Friends</div>
            <div className={styles.diversion}></div>
            <div className={styles.link}>Log out       <FontAwesomeIcon className={styles.logOutIcon} icon={faRightFromBracket} /></div>
    </div>
  )
}

export default SideNav