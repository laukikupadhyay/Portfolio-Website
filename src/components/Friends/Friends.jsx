import React, { useEffect, useState } from 'react'
import styles from "./Friends.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faXmark} from "@fortawesome/free-solid-svg-icons";
import Loader from "react-js-loader";

function Friends({user}) {
    const [friends , setFriends] = useState([]);
    const [loading , isLoading] = useState(false);

    useEffect(()=>{
        fetchUserFriends();
      },[])

      const fetchUserFriends = async ()=>{
        isLoading(true);
        try{
          const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users/getuserfriends/' + user._id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const data = await response.json();
          console.log(data);
          setFriends(data.data.friends);
          isLoading(false);
        }
        catch(err){
          console.log(err);
          isLoading(false);
        }
      }

      
  return (
    <div className={styles.friends}>
        <h2>Your Friends</h2>
        <div className={styles.divider}></div>
        {loading ? (
             <Loader type="bubble-loop" color={'#FFFFFF'} size={30} />
          ) : (
            friends.length>0 ?
            friends.map((friend)=>{
                return(
                    <div className={styles.friend}>
                    <div className={styles.friendBox}>
                    <FontAwesomeIcon className={styles.avatar} icon={faUser} />
                    <div className={styles.name}>{friend.name}</div>
                    </div>
                    <div>
                    <FontAwesomeIcon className={styles.remove} icon={faXmark} />
                    </div>
                </div>
                )
            }
            ) : (
              <h3>No friends to show!</h3>
              )
              )
          }    
    </div>
  )
}

export default Friends