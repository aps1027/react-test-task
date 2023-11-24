import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, loadMessages } from "./store/chat/chatSlice";
import { Button } from "@mui/material";

const App = () => {
  const [userName, setUserName] = useState("");

  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userName) {
      const name = prompt("Please enter your name:");
      setUserName(name || "Anonymous");
    }

    if (localStorage.getItem("messages"))
      dispatch(loadMessages(JSON.parse(localStorage.getItem("messages"))));

    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, []);

  const onStorageUpdate = (event) => {
    const { key, value } = event;
    if (key === "messages") dispatch(loadMessages(JSON.parse(value)));
  };

  const handleSendMessage = () => {
    const newMsg = { sender: userName, content: "test message 1" };
    dispatch(addMessage(newMsg));
    localStorage.setItem("messages", JSON.stringify([...messages, newMsg]));
  };

  return (
    <>
      <div>Welcome {userName}!!!</div>
      <div>
        {messages.map((message, index) => {
          return (
            <li key={index}>
              {message.sender} : {message.content}
            </li>
          );
        })}
      </div>
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </>
  );
};

export default App;
