import React, { useEffect, useState }  from 'react'
import NavBar from '../../components/navbar/Navbar'
import styles from './Room.module.css'
import RoomHeader from '../../components/Rooms/RoomHeader/RoomHeader'
import Roommembers from '../../components/Rooms/Roommembers/Roommembers'
import { useParams } from 'react-router-dom'


function RoomDetails() {
  const [room , setRoom] = useState({})
  let roomID = useParams();

  useEffect(()=>{
    getRoomDetails();
  },[])

  const getRoomDetails = async () => {
    try{
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'groups/group/' + roomID.roomId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json();
      // console.log(data);
      setRoom(data.data.group[0])
      // console.log(room)
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className={styles.roomPage}>
        <NavBar/>
        {/* <Room/> */}
        <div className={styles.headerAndSide}>
          <div className={styles.roomHeader}>
        <RoomHeader room={room}/>
          </div>
          <div className={styles.sideMembers}>
        <Roommembers room={room}/>
          </div>
        </div>
    </div>
  )
}

export default RoomDetails