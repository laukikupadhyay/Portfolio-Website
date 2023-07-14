import React, { useEffect, useState } from 'react'
import styles from "./Friends.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faXmark} from "@fortawesome/free-solid-svg-icons";
import Loader from "react-js-loader";
import { useDispatch } from 'react-redux';
import { setUser } from '../../state/auth/auth-slice';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Friends({user}) {
    const [friends , setFriends] = useState([]);
    const [loading , isLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

      const removeFriend = async (friendId)=>{
        Swal.fire({
          title: "Do you really want to remove the user as friend?",
          text: "This action cannot be undone.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then(async (result) => {
          if (result.isConfirmed) {
        try{
          const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users/removefriend/' + user._id +'/'+ friendId , {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            }
          })
          const data = await response.json();
          console.log(data.data.response.friends);
          const updatedFriends = data.data.response.friends ;   
          console.log('hi');
          console.log(updatedFriends);
          setFriends(updatedFriends); 
          const updatedUser = {...user, friends: updatedFriends};
          dispatch(setUser(updatedUser));
          Swal.fire("Removed!", "The user is not longer a friend!", "success");
        }
        catch(err){
          console.log(err);
          Swal.fire("Error!", "An error occurred while removing the friend", "error");
        }
      }
    });
  };
  
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
                    <div onClick={()=>{
                      navigate('/userpage/'+friend._id);
                    }}>
                    <div className={styles.friendBox}>
                    <img className={styles.avatar}
                      src={friend.image}
                      />
                    <div className={styles.name}>{friend.name}</div>
                    </div>
                      </div>
                    <div>
                    <FontAwesomeIcon className={styles.remove} icon={faXmark} onClick={()=> removeFriend(friend._id)}/>
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