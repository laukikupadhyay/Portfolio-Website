import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { TbMoonFilled } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function NavBar(prop) {
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
            className={`${styles.navlogo} ${styles.logocontainer}`}
            to='/main'
          >
            <span className={styles.Logo} >SportyPHY</span>
          </NavLink>

          <ul
            className={
              click ? `${styles.navmenu} ${styles.active}` : `${styles.navmenu}`
            }
          >
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
            {/* <li className={styles.navitem}> */}
              {/* <NavLink
                exact
                activeClassName={styles.active}
                className={styles.navlinks}
              >
                <IoMdNotifications />
              </NavLink> */}
              {/* <NavLink
                exact
                activeClassName={styles.active}
                className={styles.navlinks}
              >
                Home
              </NavLink> */}
            {/* </li> */}
            {/* <li className={styles.linkbuttonbns}>
              {/* Here, Buy and sale option has been removed till line 75 */}
              {/* <NavLink
                exact
                to="#"
                activeClassName={styles.active}
                className={styles.navlinksbuutonbns}
                onClick={handleClick}
              >
                <span id={styles.containerbuttonbns}>
                  <NavLink id={styles.buttonbns} to={prop.prop=="Add Item"?"/additem":"/buynsell"}>
                    {prop.prop=="Add Item" ? "Add Item" : "Buy & Sell"}
                  </NavLink>
                </span>
              </NavLink>
            </li> */}
            <li>
              <NavLink
                exact
                to="#"
                activeClassName={styles.active}
                className={styles.navlinksbuuton}
                onClick={handleClick}
              >
                <span id={styles.containerbutton}>
                  <NavLink id={styles.button} to="/allrooms">
                    ROOMS
                  </NavLink>
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
