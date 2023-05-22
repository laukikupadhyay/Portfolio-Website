import React, { useEffect, useState } from "react";
import styles from "./MyAccount.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGear } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import opencage from "opencage-api-client";
import { setUser } from "../../store/auth/auth-slice";

function MyAccount({ user, profileView }) {
  const userInfo = useSelector((state) => state.userInfo);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getLocation = async () => {
      if (userInfo) {
        setLat(userInfo.location.coordinates[1]);
        setLong(userInfo.location.coordinates[0]);
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=ca6442829bc54e7c80a88fc2782267cc`
        );
        const data = await res.json();
        console.log(data);
        setLocation(data.results[0].formatted);
        return data;
      }
    };
    const place = getLocation();
    console.log(place);
  });

  const handleAcceptRequest = async () =>{
    try{
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users/acceptrequest/'+ userInfo._id + '/' + user._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const res = await response.json();
        console.log(res.data.response);
        dispatch(setUser(res.data.response));
        window.location.reload();
    }
    catch(err){
        console.log(err);
    }
    finally{
      window.location.reload();
    }
}

const handleSendRequests = async () => {
  try{
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users/sendrequest/'+ userInfo._id + '/' + user._id, {
          method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const res = await response.json();
    console.log(res.data.response);
    dispatch(setUser(res.data.response));
    window.location.reload();
}
catch(err){
    console.log(err);
}
finally{
  window.location.reload();
}
}


const handleCancelRequest = async () => {
  try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users/cancelrequest/' + userInfo._id + '/' + user._id, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          }
      });
      const res = await response.json();
      console.log(res.data.response);
      dispatch(setUser(res.data.response));
      window.location.reload();
  } catch (err) {
      console.log(err);
      // setErrorMessage('Error cancelling request.');
  }
  finally{
    window.location.reload();
  }
}

const handleRemoveFriend = async () =>{
  try{
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users/removefriend/'+ userInfo._id + '/' + user._id, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          }
      })
      const res = await response.json();
      console.log(res.data.response);
      dispatch(setUser(res.data.response));
  }
  catch(err){
      console.log(err);
  }
  finally{
    window.location.reload();
  }
}

  return (
    <div className={styles.MyAccount}>
      <h2>{user._id === userInfo._id ? "My" : user.name} Account</h2>
      <div className={styles.divider}></div>
      <div className={styles.meDetails}>
        <div className={styles.me}>
          <div>
            <div className={styles.image}>
              <img className={styles.avatar} icon={faUser} src={user.image} />
            </div>
            <div className={styles.username}>{user.name}</div>
          </div>
        </div>
        {
  profileView && user._id !== userInfo._id && (
    <div>
      {userInfo.getRequests.includes(user._id) ? (
        <button onClick={handleAcceptRequest}>Accept Request</button>
      ) : userInfo.sentRequests.includes(user._id) ? (
        <button onClick={handleCancelRequest}>Cancel Request</button>
      ) : userInfo.friends.includes(user._id) ? (
        <button onClick={handleRemoveFriend}>Remove as friend</button>
      ) : (
        <button onClick={handleSendRequests}>Send Request</button>
      )}
    </div>
  )
}
      </div>
      <div className={styles.details}>
        <div className={styles.detailName}>
          USERNAME
          <div className={styles.detailValue}>{user.userName}</div>
        </div>
        <div className={styles.detailName}>
          EMAIL
          <div className={styles.detailValue}>{user.email}</div>
        </div>

        <div className={styles.detailName}>
          Location
          <div className={styles.detailValue}>{location}</div>
        </div>

        <div className={styles.detailName}>
          INTERESTS
          <div className={styles.detailValueTag}>
            {/* In tags   */}
            {user.interest &&
              user.interest.map((interest) => {
                return <div className={styles.tag}>{interest}</div>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
