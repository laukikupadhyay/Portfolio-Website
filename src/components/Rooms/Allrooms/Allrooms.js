import React, { useState } from "react";
import NavBar from "../../navbar/Navbar";
import "./allrooms.css";
import rooms from "./roomsdata";

function Allrooms() {
  const [cat,setcat]=useState("all");
  const filterroom=function(value){
    setcat(value)
  }
  return (
    <div>
      <NavBar />
      <div className="allrooms">
        <div className="wrapper">
          <div id="search-container">
            <input
              type="search"
              id="search-input"
              placeholder="Search Rooms name here.."
            />
            <button id="search">Search</button>
          </div>
          <div id="buttons">
            <button className="button-value" onClick={()=>filterroom('all')}>
              All
            </button>
            {rooms.data.map((i)=>{
              return(
                <button className="button-value" onClick={()=>filterroom(i.category)}>
                  {i.category}
            </button>
              )
            })}
          </div>

          <div id="rooms">           
            {rooms.data.map((room) => {
              return(
                <div className={cat==room.category?`card`:"hide"}>
                <div className="image-container">
                  <img src={room.image} />
                </div>
                <div className="container">
                  <h1 className="room-category">{room.category}</h1>
                </div>
              </div>
            )
            })}
            {rooms.data.map((room) => {
              return(
                <div className={cat=="all"?`card`:"hide"}>
                <div className="image-container">
                  <img src={room.image} />
                </div>
                <div className="container">
                  <h1 className="room-category">{room.category}</h1>
                </div>
              </div>
            )
            })}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Allrooms;
