import React, { useEffect, useState } from 'react'
import styles from "./Friends.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faXmark} from "@fortawesome/free-solid-svg-icons";

function Friends({user}) {
    const [friends , setFriends] = useState([]);

    useEffect(()=>{
        fetchUserFriends();
      },[])

      const fetchUserFriends = async ()=>{
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
        }
        catch(err){
          console.log(err);
        }
      }

      
  return (
    <div className={styles.friends}>
        <h2>Your Friends</h2>
        <div className={styles.divider}></div>

        {
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
            })
        }

                
    </div>
  )
}

export default Friends