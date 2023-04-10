import styles from "./CatRoom.module.css"
import React, { useEffect, useState } from 'react'
import { rooms } from "../../../assests/data"
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faTrash} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import InvitationRoom from "../InvitationRoom/InvitationRoom";
import EachCatRoom from "./EachCatRoom/EachCatRoom";

function CatRoom() {

  const [room , setRoom] = useState('')
  const [value , setValue] = useState(50)
  const [catRooms , setCatRooms] = useState([])
  const location = useLocation();
  const userInfo = useSelector((state) => state.userInfo);
  
  useEffect(() => {
    console.log(location.state.propValue)
    if (location.state && location.state.propValue) {
      setRoom(location.state.propValue);
      getCategoryRooms(location.state.propValue.name);
    }
  }, [location.state]);
  

  const getCategoryRooms = async (category) => {
    try{
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + `groups/` + category, {
        method:'GET'
      })
      const data = await res.json();
      console.log(data);
      setCatRooms(data.data.groups);
      // console.log(catRooms)
    }
    catch(err){
      console.log(err);
    }
  }
  const handleSliderChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  // const handleEnter = ()=>{
  //   navigate()
  // }
  return (
    <div className={styles.roomList}>
      <h1>{room.name}</h1>

      <div className={styles.sliderContainer}>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={handleSliderChange}
              className={styles.slider}
            />
            <div className={styles.sliderValue}>
              Search in the radius : {value} kms
            </div>
          </div>
      <div className={styles.catRooms}>
      {catRooms.map((eachRoom) => {
        return (
       <EachCatRoom eachRoom={eachRoom} value={value} />
        )
      })}
      </div>
  </div>
  )
}

export default CatRoom