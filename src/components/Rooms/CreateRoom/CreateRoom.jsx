import React, { useEffect, useState } from "react";
import styles from "./CreateRoom.module.css";
import { sports } from "../../../assests/data";
import Loader from "react-js-loader";
import Swal from "sweetalert2";
import axios from "axios"

function CreateRoom({user}) {
  const [roomName, setRoomName] = useState("Set your room Name");
  const [desc , setDesc] = useState("Hey! I am creating a new room!!");
  const [selectedSport, setSelectedSport] = useState('Cricket');
  const [image , setImage] = useState('');
  const [maxSize, setMaxSize] = useState(22);
  const [loading , isLoading] = useState(false);
  const [roomObjectId , setRoomObjectId] = useState("");
  const [roomid,setRoomid]=useState("")
  const [visibility,setVisibility]=useState("Public")

  useEffect(() => {
    console.log('RoomId1 ' + roomid);
    handleSetRoomId();
  }, [roomid]);

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
  const handleVisibilityChange = (e) =>{
    setVisibility(e.target.value)
  }
  const handleImageChange= (e) =>{
    setImage(e.target.files[0])
  }

  const handleSetRoomId = ()=>{
    try{
        axios.post(process.env.REACT_APP_BACKEND_URL+`groups/addroomid/${roomObjectId}/${roomid}`,
        ).then(r=>console.log("Room id stored in backend"))
      }catch(err){
          console.log(err)
        }
  }
  // console.log(user);
  async function handleSubmit(e) {
    e.preventDefault();
    isLoading(true);
    try{
      const form = new FormData();
      form.append('name', roomName);
      form.append('adminName', user.name);
      form.append('desc', desc);
      form.append('creator', user.email);
      form.append('visibility', visibility);
      form.append('players', [user._id]);
      form.append('type', selectedSport);
      form.append('maxSize', maxSize);
      form.append('image', image);
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + 'groups/creategroup', {
        method: 'POST',
        body: form,
      })
      console.log(res);
      const data = await res.json();
      console.log(data);
      setRoomObjectId(data.data.group._id);
      
      
      // try {
      //   axios
      //   .put(
      //     "https://api.chatengine.io/users/",
      //     { username: user.userName, secret: user.password },
      //     { headers: { "private-key": "fc1f7010-933f-4e48-ae65-26ceebd03ebb" } }
      //     )
      //     .then((r) => console.log("chat engine post sent"));
      //   } catch (err) {
      //     console.log(err);
      //   }
        
      //   try{
      //       axios.post(
      //           "https://api.chatengine.io/chats/",
      //     {  title: roomName  },
      //         {headers: {
      //           "Project-ID": "6f3959ca-851c-4ab1-8b06-71236bd7d680",
      //           "User-Name": user.userName,
      //           "User-Secret": user.password
      //           // "Private-Key": "fc1f7010-933f-4e48-ae65-26ceebd03ebb",
      //         }}
      //   ).then((response) => {
      //     console.log(response.data.id);  
      //     setRoomid(response.data.id)
      //   })}
      //   catch(err){
      //       console.log(err)
      //     }
      //     finally{
      //       console.log('RoomId1 '+roomid);
      //     }
              
        isLoading(false);
        Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Room created!',
        showConfirmButton: false,
        timer: 1500
      })
    }
    catch(err){
      console.log(err);
      isLoading(false);
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      })
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
        <div>Visibility:</div>
        <div className={styles.dropdown}>
      <select 
      value={selectedSport} onChange={handleVisibilityChange}
      >
       <option value="Public">Public</option>
        <option value="Private">Private</option>
      </select>
    </div>
        <div className={styles.gameType}>Game Type:</div>
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
      <input type="file" onChange={handleImageChange} />

      {
        loading ? 
            <Loader type="bubble-loop" color={'#FFFFFF'} size={30} />:
      <button onClick={handleSubmit}>  
            Update details
          </button>
          }
        
      </div>

    </div>
  );
}

export default CreateRoom;
