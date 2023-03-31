import React from "react";
import styles from "./CreateRoom.module.css";
import { sports } from "../../../assests/data";

function CreateRoom() {
  return (
    <div className={styles.createRoomContainer}>
      <h2>Create Your Own Room</h2>
      <div className={styles.divider}></div>

      <div className={styles.form}>
        <div className={styles.field}>
          <div>Room name:</div>
          <input className={styles.input} placeholder="Anshu Joshi" />
        </div>

        <div className={styles.field}>
          <div>Room Desc:</div>
          <input className={styles.input} placeholder="Anshu Joshi" />
        </div>

        <div className={styles.field}>
        <div>Game Type:</div>
        <div className={styles.dropdown}>
      <select>
        {
        sports.map((sport)=>{
            return(
                <option value={styles.name}>{sport.name}</option>
            )
        })
    }
      </select>
    </div>
        </div>


      <button>Create Room</button>
        
      </div>

    </div>
  );
}

export default CreateRoom;
