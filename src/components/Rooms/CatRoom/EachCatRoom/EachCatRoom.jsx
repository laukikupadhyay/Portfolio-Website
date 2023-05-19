import React, { useEffect, useState } from 'react';
import styles from './EachCatRoom.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from 'react-js-loader';

function EachCatRoom({ eachRoom, value }) {
  const [roomWithinRange, isRoomWithinRange] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    getUsersWithinRange();
  }, [value]);

  const getUsersWithinRange = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          'users/users-within/' +
          value +
          '/center/' +
          userInfo.location.coordinates[1] +
          ',' +
          userInfo.location.coordinates[0] +
          '/unit/km',
        {
          method: 'GET',
        }
      );
      const data = await res.json();
      console.log(data);
      const usersWithinRange = data.data.users;
      console.log(usersWithinRange);
      
      const isAdminWithinRange = usersWithinRange.some((user) => {
        return user.email === eachRoom.creator;
      });
      console.log(isAdminWithinRange)
      isRoomWithinRange(isAdminWithinRange);
    } catch (err) {
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + 'groups/join/'+ userInfo._id +"/"+ eachRoom._id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      navigate(`/room/${eachRoom._id}`);
    } catch (err) {
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div>
      {roomWithinRange && (
        <div className={styles.room}>
          <div className={styles.group}>
            <div className={styles.groupDetails}>
              <div className={styles.teamName}>{eachRoom.name}</div>
              <div className={styles.teamDesc}>{eachRoom.desc}</div>
              <div className={styles.teamSize}>
                No. of members: {eachRoom.players.length}/{eachRoom.maxSize}
              </div>
            </div>
          </div>
          <div>
              
          {loading ? (
  <Loader type="bubble-loop" bgColor={"#FFFFFF"} color={"#FFFFFF"} size={30} />
) : (
  <>
    {eachRoom.players.includes(userInfo._id) ? (
      <i>You are already in the group</i>
    ) : (
      <button onClick={handleJoin}>Join</button>
    )}
  </>
)}
            <button className={styles.enter} onClick={() => navigate(`/room/${eachRoom._id}`)}>
              Enter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EachCatRoom;
