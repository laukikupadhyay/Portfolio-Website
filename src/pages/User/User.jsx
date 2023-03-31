import React from "react";
import Navbar from "../../components/navbar/Navbar";
import SideNav from "../../components/SideNav/SideNav";
import MyAccount from "../../components/MyAccount/MyAccount";
import styles from "./User.module.css"
import MyRooms from "../../components/Rooms/MyRooms/MyRooms";

function Main() {
  return (
    <>
    <Navbar />
    <div style={{ display: "flex", flexDirection: "row" }}>
    <SideNav/>
    {/* <MyAccount/> */}
    <MyRooms/>
    </div>
    </>
  );
}

export default Main;
