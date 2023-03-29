import React from "react";
import Profile from "../../components/Profile/Profile";
import Post from "../../components/Post/Post";
import Header from "../../components/Header/Header";
import Navbar from "../../components/navbar/Navbar";

function Main() {
  return (
    <>
    <Navbar />
      <Profile />
      <Header/>
      <Post />
    </>
  );
}

export default Main;
