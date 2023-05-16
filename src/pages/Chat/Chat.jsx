import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { useSelector } from "react-redux";
import useChat from "./UseChat";

const ChatRoom = (props) => {
  const { roomId } = useParams();
  const state = useSelector((state) => state);
  const name=state.userInfo.name;
  const { messages, sendMessage } = useChat(roomId,name);
  const [newMessage, setNewMessage] = React.useState("");
  const [oldMessage, setOldMessage] = React.useState([]);
  console.log(state.userInfo.name)
  //useEffect to fetch messages from database
  useEffect(() => {
    console.log("useeffect running in chatroom")
    fetch("http://localhost:8000/api/messages/"+roomId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
  })
    .then((res) => res.json())  
    .then((data) => {
        console.log(data.data.message);  
        setOldMessage(data.data.message)
    })
    .catch((err) => {   
        console.log(err);  
    });
    }, []);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
        {oldMessage.map((message, i) => (
            <li
                key={i}
                className={`message-item ${
                  message.name==name ? "my-message" : "received-message"
                }`}
            >
               {message.name}: {message.messages}
            </li>
            ))}
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
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
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default ChatRoom;