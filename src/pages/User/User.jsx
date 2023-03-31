import React, {useState} from "react";
import Navbar from "../../components/navbar/Navbar";
import SideNav from "../../components/SideNav/SideNav";
import MyAccount from "../../components/MyAccount/MyAccount";
import styles from "./User.module.css"
import MyRooms from "../../components/Rooms/MyRooms/MyRooms";
import Friends from "../../components/Friends/Friends";
import CreateRoom from "../../components/Rooms/CreateRoom/CreateRoom";
import EditProfile from "../../components/EditProfile/EditProfile";

function Main() {
  const [activeComponent, setActiveComponent] = useState("EditProfile");

  function handleLinkClick(componentName) {
    setActiveComponent(componentName);
  }
  return (
    <div >
      <Navbar />
      <div className={styles.userlayout}>
        <SideNav onLinkClick={handleLinkClick} />
        {activeComponent === "MyAccount" && <MyAccount />}
        {activeComponent === "MyRooms" && <MyRooms />}
        {activeComponent === "Friends" && <Friends />}
        {activeComponent === "CreateRoom" && <CreateRoom />}
        {activeComponent === "EditProfile" && <EditProfile />}
      </div>
    </div>
  );
}

export default Main;
