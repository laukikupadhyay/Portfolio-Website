import React, { useState } from "react";
import styles from "./CreateRoom.module.css";
import { sports } from "../../../assests/data";

function CreateRoom({user}) {
  const [roomName, setRoomName] = useState("Set your room Name");
  const [desc , setDesc] = useState("Hey! I am creating a new room!!");
  const [selectedSport, setSelectedSport] = useState('Cricket');
  const [maxSize, setMaxSize] = useState(11);

  const handleRoomNameChange = (e) =>{
    setRoomName(e.target.value)
  }
  const handleDescChange = (e) =>{
    setDesc(e.target.value)
  }
  function handleSportChange(e) {
    const selectedSportName = e.target.value;
    const selectedSport = sports.find(
      (sport) => sport.name === selectedSportName
    );
    setSelectedSport(selectedSportName);
    setMaxSize(selectedSport.maxPlayer);
  }
  console.log(user);
  async function handleSubmit(e) {
    e.preventDefault();
    console.log('Room Name: ', roomName);
    console.log('Room Desc: ', desc);
    console.log('Selected Sport: ', selectedSport);
    console.log('Max Size: ', maxSize);
    try{
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + 'groups', {
        method: 'POST',
        body: JSON.stringify({
          name: roomName,
          adminName: user.name,
          desc: desc,
          creator: user.email,
          players:[user._id],
          type: selectedSport,
          maxSize:maxSize
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json();
      console.log(data);
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className={styles.createRoomContainer}>
      <h2>Create Your Own Room</h2>
      <div className={styles.divider}></div>

      <div className={styles.form}>
        <div className={styles.field}>
          <div>Room name:</div>
          <input className={styles.input} value={roomName} onChange={handleRoomNameChange}/>
        </div>

        <div className={styles.field}>
          <div>Room Desc:</div>
          <input className={styles.input} value={desc} onChange={handleDescChange} />
        </div>

        <div className={styles.field}>
        <div>Game Type:</div>
        <div className={styles.dropdown}>
      <select 
      value={selectedSport} onChange={handleSportChange}
      >
        {
        sports.map((sport)=>{
            return(
                <option value={styles.name} onChange={()=>{
                  setMaxSize(sport.maxPlayer)
                }}>{sport.name}</option>
            )
        })
    }
      </select>
    </div>
        </div>
      <div>Max number of players : {maxSize}</div>
      <button onClick={handleSubmit}>Create Room</button>
        
      </div>

    </div>
  );
}

export default CreateRoom;
