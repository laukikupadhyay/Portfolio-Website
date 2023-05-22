import styles from "./CatRoom.module.css"
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import EachCatRoom from "./EachCatRoom/EachCatRoom";
import Loader from "react-js-loader";

function CatRoom() {

  const [room , setRoom] = useState('')
  const [value , setValue] = useState(50)
  const [catRooms , setCatRooms] = useState([])
  const location = useLocation();
  const [loading ,setLoading] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  const locationNotUpdated = !userInfo.location.coordinates[1] && !userInfo.location.coordinates[0];
  
  useEffect(() => {
    console.log(location.state.propValue)
    if (location.state && location.state.propValue) {
      setRoom(location.state.propValue);
      getCategoryRooms(location.state.propValue.name);
    }
  }, [location.state, value]);
  

  const getCategoryRooms = async (category) => {
    setLoading(true);
    try{
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + `groups/` + category, {
        method:'GET'
      })
      const data = await res.json();
      console.log(data);
      const publicRooms = data.data.groups.filter(checkVisibility);
      setCatRooms(publicRooms);
      console.log(catRooms)
      setLoading(false);
    }
    catch(err){
      console.log(err);
      setLoading(false);
    }
  }
  function checkVisibility(room){
    return room.visibility==='Public';
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
        {loading ? (
          <Loader type="bubble-loop" bgColor={"#FFFFFF"} color={'#FFFFFF'} size={30} />
        ) : (
          <>
            {locationNotUpdated ? (
              <div className={styles.room}>
                <i>
                  <h3>Location not updated , Go to edit profile to update the location ....</h3>
                </i>
              </div>
            ) : (
              <>
                {catRooms.map((eachRoom) => (
                  <div key={eachRoom.id}>
                    <EachCatRoom eachRoom={eachRoom} value={value} />
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CatRoom
