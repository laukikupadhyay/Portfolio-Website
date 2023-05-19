import React, { useEffect, useState } from "react";
import "./BuynSell.css";
import { sports } from "../../assests/data";
import { useNavigate } from "react-router-dom"; 
import NavBar from "../../components/navbar/Navbar";

function BuynSell() {
  const [cat, setcat] = useState("all");
  const [prods, setProds] = useState([]);

  // const navigate = useNavigate();
  const filterroom = function (value) {
    setcat(value);
  };

  

  useEffect(() => {
    const getprods = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + `items/getitems`, {
          method: "GET",
        });
        const data = await res.json();
        // console.log(data.data.items);
        setProds(data.data.items)
      } catch (err) {
        console.log(err.message);
      }
    };
    getprods();
  }, []);
  console.log(prods)

  return (
    <div>
      <NavBar prop={"Add Item"}/>
      <div className="allrooms">
        <div className="wrapper">
        
          <div id="buttons">
            <button className="button-value" onClick={() => filterroom("all")}>
              All
            </button>
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

            {prods.map((prod) => {
              return (
                <div className={cat == prod.category ? `cardbns` : "hide"}>
                  <div className="image-containerbns">
                    <img src={prod.image} />
                  </div>
                  <div className="containerbns">
                    <h1 className="room-categorybns">{prod.itemname}</h1>
                    <h1 className="room-pricebns">₹ {prod.price}</h1>
                    <h1 className="room-pricebns">Owner: {prod.username}</h1>
                    <p className="proddesc">Description: {prod.description}</p>
                  </div>
                  <button
                    className="buttonbns"
                  >
                    contact
                  </button>
                </div>
              );
            })}
            {prods.map((prod) => {
              return (
                <div className={cat == "all" ? `cardbns` : "hide"}>
                  <div className="image-containerbns">
                    <img src={prod.image} />
                  </div>
                  <div className="containerbns">
                    <h1 className="room-categorybns">{prod.itemname}</h1>
                    <h1 className="room-pricebns">₹ {prod.price}</h1>
                    <h1 className="room-pricebns">Owner: {prod.username}</h1>
                    <p className="proddesc">Description: {prod.description}</p>
                  </div>
                  <button
                    className="buttonbns"
                  >
                    contact
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

export default BuynSell