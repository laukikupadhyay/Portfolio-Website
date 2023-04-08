import styles from "./CatRoom.module.css"
import React, { useEffect, useState } from 'react'
import { rooms } from "../../../assests/data"
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faTrash} from "@fortawesome/free-solid-svg-icons";

function CatRoom() {

  const [room , setRoom] = useState('')
  const [value , setValue] = useState(50)
  const [catRooms , setCatRooms] = useState([])
  const location = useLocation();
  
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
      console.log(catRooms)
    }
    catch(err){
      console.log(err);
    }
  }
  const handleSliderChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };
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
          <div className={styles.room}>
            <div className={styles.group}>
            <div className={styles.groupDetails}>
                <div className={styles.teamName}>{eachRoom.name}</div>
                <div className={styles.teamDesc}>{eachRoom.desc}</div>
                <div className={styles.teamSize}>No. of members : {eachRoom.players.length}/{eachRoom.maxSize}</div>
            </div>
            </div>
            <div>
            <button>
              Join
            </button>
            <button className={styles.enter}>
              Enter
            </button>
            </div>
        </div>
        )
      })}
      </div>
  </div>
  )
}

export default CatRoom