import React from "react";
import NavBar from "../../navbar/Navbar";
import "./allrooms.css"
function Allrooms() {
  return (
    <div >
        <NavBar/>
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
          <button className="button-value" onClick="filterProduct('Bottomwear')">
            FootBall
          </button>
          <button className="button-value" onClick="filterProduct('Jacket')">
            Basketball
          </button>
          <button className="button-value" onClick="filterProduct('Watch')">
            Badminton
          </button>
        </div>

        
        <div id="products"></div>
      </div>
      </div>
      </div>
  );
}

export default Allrooms;
