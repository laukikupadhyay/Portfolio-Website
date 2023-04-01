import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { TbMoonFilled } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="#" className="nav-logo logo-container">
            <span class="Logo">Meet n Play</span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="#"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <TbMoonFilled />
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                exact
                to="/profile"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Profile
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                exact
                to="#"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <IoMdNotifications />
              </NavLink>
            </li>
            <li >
              <NavLink
                exact
                to="#"
                activeClassName="active"
                className="nav-links-buuton"
                onClick={handleClick}
              >
                <span id="container-button">
                  <button id="button">ROOMS</button>
                </span>
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
