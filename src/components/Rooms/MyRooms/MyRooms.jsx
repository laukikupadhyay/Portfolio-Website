import React, { useEffect, useState } from 'react'
import styles from "./MyRooms.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faTrash} from "@fortawesome/free-solid-svg-icons";

function MyRooms({user}) {
  const [rooms , setRooms] = useState([]);

  useEffect(()=>{
    fetchUserGroups();
  },[])

  const fetchUserGroups = async ()=>{
    try{
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'groups/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json();
      console.log(data);
      const userRooms = [];
      data.data.groups.map((room)=>{
        if(room.players.includes(user._id)){
          userRooms.push(room);
        }
      })
      setRooms(userRooms);
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className={styles.rooms}>
        <h2>All Rooms</h2>
        <div className={styles.divider}></div>
        <div className={styles.userRooms}>
        {
          rooms.map((room)=>{
            return(
              <div className={styles.room}>
              <div className={styles.group}>
              <div className={styles.groupDetails}>
                  <div className={styles.teamName}>{room.name}</div>
                  <div className={styles.teamDesc}>{room.desc}</div>
                  <div className={styles.teamSize}>No. of members : {room.players.length}/{room.maxSize}</div>
              </div>
              </div>
              <div>
              <button>
                Enter
              </button>
              <button className={styles.leave}>
                {
                  room.creator === user.email ? `Delete` : `Leave`
                }
              </button>
              </div>
          </div>
            )
          })
        }
                
        </div>
    </div>
  )
}

export default MyRooms