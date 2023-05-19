import React, { useEffect, useState } from "react";
import "./BuynSell.css";
import { sports } from "../../assests/data";
import { useNavigate } from "react-router-dom"; 
import NavBar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";

function BuynSell() {
  const [cat, setcat] = useState("all");
  const [prods, setProds] = useState([]);
  const userInfo = useSelector((state) => state.userInfo);

  // const navigate = useNavigate();
  const filterroom = function (value) {
    setcat(value);
  };

  const handleClick = (name,email,itemname,price,desc) => {
    console.log(itemname,price,desc)
    const msg="I would like to buy this product posted by you at SportiPHY: \n\nItem Name: "+itemname+"\nPrice: "+price+"\nDescription: "+desc+"\n\nPlease contact me at "+userInfo.email+" if you are interested to sell this product."

    emailjs
      .send(
        "service_j8bmr44",
        "template_7545ba6",
        {
          from_name: userInfo.name,
          to_name: name,
          from_email: userInfo.email,
          to_email: email,
          message: msg,
        },
        "Rm1ia-p6cq15IJQrr"
      )
      .then(
        () => {
          alert(`Thank you.Email sent to ${name} that you are interested to buy this product.`);

         
        },
        (error) => {
          
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );




  }
  

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
                    onClick={()=>handleClick(prod.username,prod.email,prod.itemname,prod.price,prod.description)}
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
                    onClick={()=>handleClick(prod.username,prod.email,prod.itemname,prod.price,prod.description)}
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