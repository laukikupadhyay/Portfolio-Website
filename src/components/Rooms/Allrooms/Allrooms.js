import React, { useEffect, useState } from "react";
import NavBar from "../../navbar/Navbar";
import "./allrooms.css";
import { sports } from "../../../assests/data";
import { useNavigate } from "react-router-dom";

function Allrooms() {
  const [cat, setcat] = useState("all");
  const [value, setValue] = useState(50);
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();
  const filterroom = function (value) {
    setcat(value);
  };

  const navigateToRoomsPage = (room) => {
    navigate("/category", { state: { propValue: room } });
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + `groups`, {
          method: "GET",
        });
        const data = await res.json();
        console.log(data.data.groups);
        setGroups(data.data.groups);
      } catch (err) {
        console.log(err.message);
      }
    };
    getPosts();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="allrooms">
        <div className="wrapper">
          <div id="search-container">
            <button
              id="search"
              onClick={() => {
                navigate("/search");
              }}
            >
              Search For Users
            </button>
          </div>
          <div id="buttons">
            <button className="button-value" onClick={() => filterroom("all")}>
              All
            </button>
            {console.log(sports)}
            {sports.map((i) => {
              return (
                <button
                  className="button-value"
                  onClick={() => filterroom(i.name)}
                >
                  {i.name}
                </button>
              );
            })}
          </div>

          <div id="rooms">
            {sports.map((room) => {
              return (
                <div className={cat == room.name ? `card` : "hide"}>
                  <div className="image-container">
                    <img src={room.image} />
                  </div>
                  <div className="container">
                    <h1 className="room-category">{room.name}</h1>
                  </div>
                  <button
                    onClick={() => {
                      navigateToRoomsPage(room);
                    }}
                  >
                    Search
                  </button>
                </div>
              );
            })}
            {sports.map((room) => {
              return (
                <div className={cat == "all" ? `card` : "hide"}>
                  <div className="image-container">
                    <img src={room.image} />
                  </div>
                  <div className="container">
                    <h1 className="room-category">{room.name}</h1>
                  </div>
                  <button
                    onClick={() => {
                      navigateToRoomsPage(room);
                    }}
                  >
                    Search
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Allrooms;
