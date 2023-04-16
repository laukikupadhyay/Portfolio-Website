import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ChatEngine, MessageFormSocial } from "react-chat-engine";
import "./Chat.css";

function Chat() {
  const { userName, password } = useSelector((state) => state.userInfo);
  console.log(userName, password);
  const [showchat, setShowchat] = useState(false);

  useEffect(() => {
    if (typeof document != null) {
      setShowchat(true);
    }




  }, []);

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100vh - 212px)"
          projectID="6f3959ca-851c-4ab1-8b06-71236bd7d680"
          userName={userName}
          userSecret={password}
          renderNewMessageForm={() => <MessageFormSocial />}
        />
      </div>
    </div>
  );
}

export default Chat;