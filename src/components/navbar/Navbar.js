import React from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.nav}>
      <div className={styles.navheader}>
        <div className={styles.navtitle}>Logo</div>
      </div>
      <div className={styles.navbtn}>
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className={styles.navlinks}>
        <a href="#" >
          Link1
        </a>
        <a href="#" >
          Link 2
        </a>
        <a href="#" >
          Link 3
        </a>
        <a href="#" >
          Link 4
        </a>
        <a href="#" >
          Link 5
        </a>
      </div>
    </div>
  );
}

export default Navbar;
