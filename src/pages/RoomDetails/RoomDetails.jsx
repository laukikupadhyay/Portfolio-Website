import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/Navbar'
import styles from './Room.module.css'
import RoomHeader from '../../components/Rooms/RoomHeader/RoomHeader'
import Roommembers from '../../components/Rooms/Roommembers/Roommembers'
import { useParams } from 'react-router-dom'


function RoomDetails() {
  const [room, setRoom] = useState({})
  const { roomId } = useParams();
  
  useEffect(() => {
    async function getRoomDetails() {
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'groups/group/' + roomId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const data = await response.json();
        console.log(data)
        console.log(data.data.group)
        setRoom(data.data.group)
        console.log(room)
      } catch (err) {
        console.log(err)
      }
    }
    getRoomDetails();
  }, [roomId])

  return (
    <div className={styles.roomPage}>
      <NavBar />
      <div className={styles.headerAndSide}>
          {
            room && 
        <>
        <div className={styles.roomHeader}>
          <RoomHeader room={room} />
        </div>
        <div className={styles.sideMembers}>
          <Roommembers room={room} />
        </div>
        </>
        }
      </div>
    </div>
  )
}

export default RoomDetails
