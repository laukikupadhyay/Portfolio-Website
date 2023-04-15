import React, { useEffect, useState } from 'react'
import styles from "./MyRooms.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faTrash} from "@fortawesome/free-solid-svg-icons";
import Loader from "react-js-loader";
import { useNavigate } from 'react-router-dom';


function MyRooms({user}) {
  const [rooms , setRooms] = useState([]);
  const [loading , isLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    fetchUserGroups();
  },[])

  const fetchUserGroups = async ()=>{
    isLoading(true);
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
      isLoading(false);
    }
    catch(err){
      console.log(err);
      isLoading(false);
    }
  }

  const handleLeave = async ()=>{
    try{
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + '')
    }
    catch(err){

    } finally {
      window.location.reload();
    }
  }
  const handleDelete = async () =>{

  }
  
  return (
    <div className={styles.rooms}>
        <h2>All Rooms</h2>
        <div className={styles.divider}></div>
        <div className={styles.userRooms}>
          {loading ? (
             <Loader type="bubble-loop" color={'#FFFFFF'} size={30} />
          ) : (
            rooms.length > 0 ? (
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
                      <button onClick={()=>{

                        navigate('/room/' + room._id)
                      }
                      }>
                        Enter
                      </button>
                        {
                          room.creator === user.email ? 
                      <button className={styles.leave} onClick={handleDelete}>
                          Delete
                      </button>
                          : 
                          <button className={styles.leave} onClick = {handleLeave}>
                          Leave
                          </button>
                        }
                    </div>
                  </div>
                )
              })
            ) : (
              <h3>No rooms to show!</h3>
            )
          )}
        </div>
    </div>
  )
}

export default MyRooms
