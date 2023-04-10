import React, { useEffect, useState } from "react";
import styles from "./EachUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/auth/auth-slice";

function EachUser({ user }) {
  const userInfo = useSelector((state) => state.userInfo);
  const [usersWithinRange, setUsersWithinRange] = useState([]);
  const [userFriends, setUserFriends] = useState(userInfo.friends);
  const [userPendingRequests, setuserPendingRequests] = useState(
    userInfo.sentRequests
  );
  const [userReceivedRequests, setuserReceivedRequests] = useState(
    userInfo.getRequests
  );
  const [isFriend, setIsFriend] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isReceived, setIsReceived] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    checkUserStatus();
  }, [userFriends, userPendingRequests, userReceivedRequests]);

  const checkUserStatus = () => {
    if (userFriends && userFriends.includes(user._id)) {
      setIsFriend(true);
    } else if (userPendingRequests && userPendingRequests.includes(user._id)) {
      setIsPending(true);
    } else if (
      userReceivedRequests &&
      userReceivedRequests.includes(user._id)
    ) {
      setIsReceived(true);
    }
  };

  console.log(isFriend, isPending, isReceived)
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
        setMessage("Friend request sent!");
    }
    catch(err){
        console.log(err);
    }
}

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
        setMessage("Friend request accepted!");
    }
    catch(err){
        console.log(err);
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
        setMessage("Friend removed!");
    }
    catch(err){
        console.log(err);
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
        setuserPendingRequests(res.data.response.sentRequests);
        setIsPending(false);
        setMessage('Request cancelled successfully.');
    } catch (err) {
        console.log(err);
        // setErrorMessage('Error cancelling request.');
    }
}

//   if(userInfo._id === user._id){
//     return null;
//   }
return (
    <div className={styles.allnearByUsers}>
      <div className={styles.divider}></div>
      <div className={styles.friend}>
        <div className={styles.friendBox}>
          <FontAwesomeIcon className={styles.avatar} icon={faUser} />
          <div className={styles.name}>{user.name}</div>
        </div>
        <div>
          {isFriend ? (
            <button className={styles.reqButton} onClick={handleRemoveFriend}>
              {
                message ? message : "Remove Friend"
              }
            </button>
          ) : isPending ? (
            <button className={styles.reqButton} onClick={handleCancelRequest}>
              {
                message ? message : "Cancel Request"
              }
            </button>
          ) : isReceived ? (
            <button className={styles.reqButton} onClick={handleAcceptRequest}>
              {
                message ? message : "Accept Request"
              }
            </button>
          ) : (
            <button className={styles.reqButton} onClick={handleSendRequests}>
              {
                message ? message : "Send Request"
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EachUser;
