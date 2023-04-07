import React, { useEffect } from "react";
import Profile from "../../components/Profile/Profile";
import Post from "../../components/Post/Post";
import Header from "../../components/Header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store/auth/auth-slice.js';

function Main() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem(`sb-soqmlrodsqlvbpmdhesr-auth-token`));
  const newuser = useSelector(state => state.auth.userInfo);
  useEffect(() => {
    // console.log(user);
    // if (user) {
    //   dispatch(setUser(user.user.user_metadata));
    //   console.log(newuser);
    // }
    console.log(newuser)
  }, []);

  return (
    <>
      <Navbar />
      <Profile user={newuser} />
      <Header user={newuser} />
      <Post user={newuser} />
    </>
  );
}

export default Main;
