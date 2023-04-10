import React, { useEffect } from "react";
import Profile from "../../components/Profile/Profile";
import Post from "../../components/Post/Post";
import Header from "../../components/Header/Header";
import Navbar from "../../components/navbar/Navbar";
import styles from './Main.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store/auth/auth-slice.js';

function Main() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo);
  useEffect(() => {
    // console.log(user);
    // if (user) {
    //   dispatch(setUser(user.user.user_metadata));
    //   console.log(userInfo);
    // }
    console.log(userInfo)
  }, []);

  return (
    <>
      <Navbar />
    <div className={styles.mainContainer}>
      <div>
      <Profile user={userInfo} />
      </div>
      <div>
      <Header user={userInfo} />
      <Post user={userInfo} ownProfileView={false}/>
      </div>
    </div>
    </>
  );
}

export default Main;
