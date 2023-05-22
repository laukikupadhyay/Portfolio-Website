import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { useSelector } from "react-redux";
import useChat from "./UseChat";
import NavBar from "../../components/navbar/Navbar";
import Roommembers from "../../components/Rooms/Roommembers/Roommembers";

const ChatRoom = (props) => {
  const { roomId, roomname } = useParams();
  const state = useSelector((state) => state);
  const name = state.userInfo.name;
  const { messages, sendMessage } = useChat(roomId, name);
  const [newMessage, setNewMessage] = React.useState("");
  const [oldMessage, setOldMessage] = React.useState([]);
  const [room , setRoom] = useState([]);
  console.log(state.userInfo.name);
  //useEffect to fetch messages from database
  useEffect(() => {
    console.log("useeffect running in chatroom");
    console.log(roomId)
    fetch(process.env.REACT_APP_BACKEND_URL+ "messages/" + roomId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.message);
        setOldMessage(data.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
      getRoomDetails();
      
  }, [
    
  ]);

  const getRoomDetails = async () => {
    try{
      const res = await fetch(process.env.REACT_APP_BACKEND_URL +"groups/group/" + roomId, {
        method: "GET",
      })

      const data = await res.json();
      console.log(data);
      setRoom(data.data.group)
    }
    catch(err){
      console.log(err);
    }

  }

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
    console.log(newMessage)
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div>
      <NavBar />
    <div className="chatroom">
      <div className="chat-room-container">
        <div className="roomheading"><span>{roomname}</span></div>
        <div className="chatsection">
          <div>
            <div className="messages-container">
              <ol className="messages-list">
                {oldMessage.map((message, i) => (
                  <li
                    key={i}
                    className={`message-item ${
                      message.name == name ? "my-message" : "received-message"
                    }`}
                  >
                    {message.name}: {message.messages}
                  </li>
                ))}
                {messages.map((message, i) => (
                  <li
                    key={i}
                    className={`message-item ${
                      message.ownedByCurrentUser
                        ? "my-message"
                        : "received-message"
                    }`}
                  >
                    {message.name}: {message.body}
                  </li>
                ))}
              </ol>
            </div>
            <textarea
              value={newMessage}
              onChange={handleNewMessageChange}
              placeholder="Write message..."
              className="new-message-input-field"
            />
            <div onClick={handleSendMessage} className="send-message-button">
              Send
            </div>
          </div>
        </div>
        <div className="chatroomusers">
          <div>
            <Roommembers room={room}/>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChatRoom;
