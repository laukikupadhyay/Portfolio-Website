import React, { useEffect, useState } from 'react'
import styles from './EachCatRoom.module.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function EachCatRoom({ eachRoom, value }) {
  const [roomWithRange, setRoomWithRange] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    getUsersWithinRange();
  }, [value])
  
  const getUsersWithinRange = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + 'users/users-within/' + value + '/center/' + userInfo.location.coordinates[1] + ',' + userInfo.location.coordinates[0] + '/unit/km', {
        method: 'GET'
      })
      const data = await res.json();
      console.log(data);
      const usersWithinRange = data.data.users;
      console.log(usersWithinRange);
      const isAdmin = usersWithinRange.some(user => user.email === eachRoom.creator);
      setRoomWithRange(isAdmin);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {roomWithRange && (
        <div className={styles.room}>
          <div className={styles.group}>
            <div className={styles.groupDetails}>
              <div className={styles.teamName}>{eachRoom.name}</div>
              <div className={styles.teamDesc}>{eachRoom.desc}</div>
              <div className={styles.teamSize}>No. of members : {eachRoom.players.length}/{eachRoom.maxSize}</div>
            </div>
          </div>
          <div>
            <button>
              Join
            </button>
            <button className={styles.enter} onClick={() => {
              navigate(`/room/${eachRoom._id}`)
            }}>
              Enter
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EachCatRoom
