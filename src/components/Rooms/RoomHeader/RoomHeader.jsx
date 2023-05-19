import React, { useEffect, useState } from 'react'
import styles from "./RoomHeader.module.css"
import demo from '../../../assests/images/demo.jpg'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

function RoomHeader({room}) {
  //get room id from params
  const [isCopied, setIsCopied] = useState(false);
  const [matchStatus , setMatchStatus] = useState('close');
  const userInfo = useSelector((state) => state.userInfo);
  
  const handleCopy = () => {
    const copyText = document.getElementById("code");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const changeGroupVisibility = async () =>{
    try{
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + 'groups/changegroupvisibility/' + room._id , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      } )
      window.location.reload();
    }
    catch(err){
      console.log(err);
    }
  }
  const getMatchStatus = async () => {
    setMatchStatus(room.status);
  }

  useEffect(()=>{
    getMatchStatus();
  })
  return (
    <div className={styles.roomHeaderContainer}>
         <div className={styles['group-header']}>
      <img src={room.image} alt="Group Display Picture" className={styles['group-dp']} />
      <div className={styles['group-info']}>
        <h1 className={styles['group-name']}>{room.name}</h1>
        <p className={styles['group-description']}>{room.desc}</p>
        
        <p className={styles['group-members']}>No. of members: <span className={styles.tagStyle}>
          {
            room.players ? room.players.length : 0
          }/{room.maxSize}
        </span></p>
        <p className={styles['group-created-by']}>Created by: <span className={styles.tagStyle}>{room.adminName}</span></p>
        <div className={styles['group-visibility']}>
        <p className={styles['group-created-by']}>Visibility: <span className={styles.tagStyle}>{room.visibility}</span></p>
        {
          room.creator === userInfo.email &&
          <button onClick={changeGroupVisibility}>Change visibility</button>
        }
        </div>
        <div className={styles['group-created-at']}>
          <p>Code:</p>
            <input type="text" id="code" value={room.invitationLink} className={styles.invitationLink} readOnly />
            <button onClick={handleCopy}>Copy</button>
            {isCopied && <span className={styles.success}>Code copied!</span>}
          </div>
      </div>
    </div>
    </div>
  )
}

export default RoomHeader