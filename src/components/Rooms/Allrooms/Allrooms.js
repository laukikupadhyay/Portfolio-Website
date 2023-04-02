import React from "react";
import NavBar from "../../navbar/Navbar";
import "./allrooms.css";
import rooms from "./roomsdata";

function Allrooms() {
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
            <button className="button-value" onClick="filterProduct('all')">
              All
            </button>
            <button className="button-value" onClick="filterProduct('Topwear')">
              Cricket
            </button>
            <button
              className="button-value"
              onClick="filterProduct('Bottomwear')"
            >
              FootBall
            </button>
            <button className="button-value" onClick="filterProduct('Jacket')">
              Basketball
            </button>
            <button className="button-value" onClick="filterProduct('Watch')">
              Badminton
            </button>
            <button className="button-value" onClick="filterProduct('Watch')">
              kabaddi
            </button>
            <button className="button-value" onClick="filterProduct('Watch')">
              Tennis
            </button>
            <button className="button-value" onClick="filterProduct('Watch')">
              volleyball
            </button>
          </div>

          <div id="rooms">           
            
            {console.log(rooms.data)}
            {rooms.data.map((room) => {
              return(
                <div className="card cricket">
                <div className="image-container">
                  <img src={room.image} />
                </div>
                <div className="container">
                  <h1 className="room-category">{room.category}</h1>
                </div>
              </div>
            )
              // <div>{room}</div>
            })}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Allrooms;
