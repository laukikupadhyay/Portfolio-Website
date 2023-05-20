import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/Navbar";
import styles from "./Room.module.css";
import RoomHeader from "../../components/Rooms/RoomHeader/RoomHeader";
import Roommembers from "../../components/Rooms/Roommembers/Roommembers";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Invitation from "../../components/Invitation/Invitation";

function RoomDetails({userInfo}) {
  const [room, setRoom] = useState({});
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getRoomDetails() {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "groups/group/" + roomId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        console.log(data.data.group);
        setRoom(data.data.group);
        console.log(room.name);
      } catch (err) {
        console.log(err);
      }
    }
    getRoomDetails();
  }, []);
  return (
    <div className={styles.roomPage}>
      <NavBar />
      {/* <div className={styles.partition}></div> */}
      <div className={styles.headerAndSide}>
        {room && (
          <>
            <div className={styles.roomHeader}>
              <RoomHeader room={room} />
              {room.players && room.players.includes(userInfo._id) && (
  <div className={styles.padding2}>
    <button
      onClick={() => {
        navigate("/chat/" + roomId + "/" + room.name);
      }}
    >
      Chat with members
    </button>
  </div>
)}
              <Roommembers room={room} />
            </div>
            {
              room.players && 
              room.players.includes(userInfo._id) &&
              <div className={styles.inviteUsers}>
              <Invitation room={room} />
            </div>
            }
            <div className={styles.sideMembers}>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RoomDetails;
