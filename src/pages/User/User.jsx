import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import SideNav from "../../components/SideNav/SideNav";
import MyAccount from "../../components/MyAccount/MyAccount";
import styles from "./User.module.css";
import MyRooms from "../../components/Rooms/MyRooms/MyRooms";
import Friends from "../../components/Friends/Friends";
import CreateRoom from "../../components/Rooms/CreateRoom/CreateRoom";
import EditProfile from "../../components/EditProfile/EditProfile";
import { useSelector,useDispatch } from "react-redux";
import { setUser } from "../../store/auth/auth-slice";
import { useNavigate } from "react-router-dom";

function Main() {
  const [activeComponent, setActiveComponent] = useState("EditProfile");
  const [long, setLong] = useState(0)
  const [lat, setLat] = useState(0)

  const dispatch = useDispatch();
  
  const userInfo = useSelector((state) => state.userInfo);
  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(async function(position) {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
      });
    }
    setLocation();
}, []);

  const setLocation = async () => {
    try{
      console.log('Setting up your location ........')
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users/setlocation/' + userInfo._id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longitude: long,
          latitude: lat,
        }),
      })
      console.log(long , lat)
      const data = await response.json();
      // console.log(data.data.user)
      dispatch(setUser(data.data.user))
    }
    catch(err){
      console.log(err);
    }
  }
  function handleLinkClick(componentName) {
    setActiveComponent(componentName);
  }
  return (
    <div>
      <Navbar />
      <div className={styles.userlayout}>
        <SideNav onLinkClick={handleLinkClick} />
        {activeComponent === "MyAccount" && <MyAccount user={userInfo} />}
        {activeComponent === "MyRooms" && <MyRooms user={userInfo} />}
        {activeComponent === "Friends" && <Friends user={userInfo} />}
        {activeComponent === "CreateRoom" && <CreateRoom user={userInfo} />}
        {activeComponent === "EditProfile" && <EditProfile user={userInfo} />}
      </div>
    </div>
  );
}

export default Main;
