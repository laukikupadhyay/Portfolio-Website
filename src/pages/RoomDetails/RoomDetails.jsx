import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/Navbar'
import styles from './Room.module.css'
import RoomHeader from '../../components/Rooms/RoomHeader/RoomHeader'
import Roommembers from '../../components/Rooms/Roommembers/Roommembers'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Invitation from '../../components/Invitation/Invitation'

function RoomDetails() {
  const [room, setRoom] = useState({})
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { userName } = useSelector((state) => state.userInfo);
  
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
        console.log(room.name)
      } catch (err) {
        console.log(err)
      }
    }
    getRoomDetails();
  }, [])

  // console.log(room)


  // fetch user from database

  // axios.post("")




  // try{
            //   axios
            //   .post(`https://api.chatengine.io/chats/${room.roomId}/people/`, 
            //     {username: userName},
            //     {headers: {
            //       "Project-ID": "6f3959ca-851c-4ab1-8b06-71236bd7d680",
            //       "User-Name":  room.adminName,
            //       "User-Secret": room.invitationLink,
            //     }}
            //   )
            //   .then((res) => console.log("user added to chat"));
            // }catch{err}{
            //   console.log(err)
            // }

  return (
    <div className={styles.roomPage}>
      <NavBar />
      <div className={styles.headerAndSide}>
          {
            room && 
        <>
        <div className={styles.roomHeader}>
          <RoomHeader room={room} />
          <button onClick= {()=>{
              navigate('/chat/'+ room.roomId)
          }}>Chat with members</button>
          <div className={styles.inviteUsers}>
          <Invitation room={room}/>
          </div>
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
