import React, { useEffect, useState } from 'react'
import styles from "./RoomHeader.module.css"
import demo from '../../../assests/images/demo.jpg'
import { useParams } from 'react-router-dom'

function RoomHeader({room}) {
  //get room id from params
  const [isCopied, setIsCopied] = useState(false);
  
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
  // if (!room) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className={styles.roomHeaderContainer}>
         <div className={styles['group-header']}>
      <img src={demo} alt="Group Display Picture" className={styles['group-dp']} />
      <div className={styles['group-info']}>
        <h1 className={styles['group-name']}>{room.name}</h1>
        <p className={styles['group-description']}>{room.desc}</p>
        
        <p className={styles['group-members']}>No. of members: <span className={styles.tagStyle}>
          {
            room.players ? room.players.length : 0
          }/{room.maxSize}
        </span></p>
        <p className={styles['group-created-by']}>Created by: <span className={styles.tagStyle}>{room.adminName}</span></p>
        <div className={styles['group-created-at']}>
          <p>Code:</p>
            <input type="text" id="code" value={room.invitationLink} className={styles.invitationLink} readOnly />
            <button onClick={handleCopy}>Copy</button>
            {isCopied && <span className={styles.success}>Code copied!</span>}
          </div>
      </div>
    </div>
    <button>Find a match</button>
    </div>
  )
}

export default RoomHeader