import styles from "./SideNav.module.css"
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function SideNav(props) {
  return (
    <div className={styles.sideNav}>
    <div
      className={styles.link}
      onClick={() => props.onLinkClick("MyAccount")}
    >
      My Account
    </div>
    <div
      className={styles.link}
      onClick={() => props.onLinkClick("EditProfile")}
    >
      Profile
    </div>
    <div
      className={styles.link}
      onClick={() => props.onLinkClick("CreateRoom")}
    >
      Create Room
    </div>
    <div
      className={styles.link}
      onClick={() => props.onLinkClick("MyRooms")}
    >
      Manage Rooms
    </div>
    <div
      className={styles.link}
      onClick={() => props.onLinkClick("Friends")}
    >
      Manage Friends
    </div>
    <div className={styles.diversion}></div>
    <div className={styles.link}>
      Log out{" "}
      <FontAwesomeIcon className={styles.logOutIcon} icon={faRightFromBracket} />
    </div>
  </div>
  )
}

export default SideNav