import React, { useEffect, useState } from "react";
import Profile from "../../components/Profile/Profile";
import Post from "../../components/Post/Post";
import Header from "../../components/Header/Header";
import Navbar from "../../components/navbar/Navbar";
import styles from './Main.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store/auth/auth-slice.js';
import EachUser from "../../components/SearchUser/EachUser/EachUser";

function Main() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo);

  const [friendRequests , setFriendRequests] = useState([]);
  useEffect(() => {
    getFriendRequests();
  }, []);

  const getFriendRequests = async () => {
    const requests = userInfo.getRequests;
    const users = await Promise.all(requests.map(request => getUserById(request)));
    setFriendRequests(users);
    console.log(friendRequests)
  }

  const getUserById = async (id) => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data.data.user;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <div>
          <Profile user={userInfo} />
        </div>
        <div className={styles.postHeader}>
          <Header user={userInfo} />
          <Post user={userInfo} ownProfileView={false} />
        </div>
        <div className={styles.rightRequestSection}> 
          {
            friendRequests.length === 0 ?
            (
              "No requests to accept!!"
            ):
            (
              friendRequests.map((user) => (
                <EachUser user={user[0]} />
              ))
            )
          }
        </div>
      </div>
    </>
  );
}

export default Main;
