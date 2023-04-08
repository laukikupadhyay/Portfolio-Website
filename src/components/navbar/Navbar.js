import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { TbMoonFilled } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/allrooms");
  };

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navcontainer}>
          <NavLink
            exact
            to="#"
            className={`${styles.navlogo} ${styles.logocontainer}`}
          >
            <span className={styles.Logo}>SportySPY</span>
          </NavLink>

          <ul
            className={
              click ? `${styles.navmenu} ${styles.active}` : `${styles.navmenu}`
            }
          >
            <li className={styles.navitem}>
              <NavLink
                exact
                to="#"
                activeClassName={styles.active}
                className={styles.navlinks}
                onClick={handleClick}
              >
                <TbMoonFilled />
              </NavLink>
            </li>
            {/* <li className="navitem">
              <NavLink
                exact
                to="/profile"
                activeClassName="active"
                className="navlinks"
                onClick={handleClick}
              >
                Profile
              </NavLink>
            </li> */}
            <li className={styles.navitem}>
              <NavLink
                exact
                to="#"
                activeClassName={styles.active}
                className={styles.navlinks}
                onClick={handleClick}
              >
                <IoMdNotifications />
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="#"
                activeClassName={styles.active}
                className={styles.navlinksbuuton}
                onClick={handleClick}
              >
                <span id={styles.containerbutton}>
                  <button id={styles.button} onClick={handleNavigation}>
                    ROOMS
                  </button>
                </span>
              </NavLink>
            </li>
          </ul>
          <div className={styles.navicon} onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
