import React, { useState } from "react";
import styles from "./SideNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { setUser } from "../../store/auth/auth-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SideNav(props) {
  const [activeLink, setActiveLink] = useState("EditProfile");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLinkClick(linkName) {
    props.onLinkClick(linkName);
    setActiveLink(linkName);
  }

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(setUser(null));
    navigate('/')
  }

  return (
    <div className={styles.sideNav}>
      <div
        className={`${styles.link} ${activeLink === "MyAccount" && styles.active}`}
        onClick={() => handleLinkClick("MyAccount")}
      >
        My Account
      </div>
      <div
        className={`${styles.link} ${activeLink === "EditProfile" && styles.active}`}
        onClick={() => handleLinkClick("EditProfile")}
      >
        Profile
      </div>
      <div
        className={`${styles.link} ${activeLink === "CreateRoom" && styles.active}`}
        onClick={() => handleLinkClick("CreateRoom")}
      >
        Create Room
      </div>
      <div
        className={`${styles.link} ${activeLink === "MyRooms" && styles.active}`}
        onClick={() => handleLinkClick("MyRooms")}
      >
        Manage Rooms
      </div>
      <div
        className={`${styles.link} ${activeLink === "Friends" && styles.active}`}
        onClick={() => handleLinkClick("Friends")}
      >
        Manage Friends
      </div>
      <div className={styles.diversion}></div>
      <div className={styles.link} onClick ={handleLogOut}>
        Log out{" "}
        <FontAwesomeIcon className={styles.logOutIcon} icon={faRightFromBracket} />
      </div>
    </div>
  );
}

export default SideNav;
