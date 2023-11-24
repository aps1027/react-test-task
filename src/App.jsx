import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, loadMessages } from "./store/chat/chatSlice";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { LeftMessage, RightMessage } from "./components/Message";

const PAGE_SIZE = 25;

const commonStyle = {
  messageListItem: {
    listStyleType: "none",
    display: "inline-block",
    width: "100%",
  },
};

const App = () => {
  const [userName, setUserName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [displayedMessages, setDisplayedMessages] = useState([]);

  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const chatBoxRef = useRef();

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

  useEffect(() => {
    setDisplayedMessages(messages.slice(-PAGE_SIZE));
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [messages]);

  const onStorageUpdate = (event) => {
    const { key, value } = event;
    if (key === "messages") dispatch(loadMessages(JSON.parse(value)));
  };

  const scrollToBottom = () => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };

  const handleSendMessage = () => {
    const newMsg = { sender: userName, content: newMessage };
    dispatch(addMessage(newMsg));
    localStorage.setItem("messages", JSON.stringify([...messages, newMsg]));
    setNewMessage("");
    document.getElementById("messageInput").focus();
    scrollToBottom();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSendMessage();
  };

  const handleLoadMore = () => {
    const currentLength = displayedMessages.length;
    if (currentLength !== messages.length) {
      const newMessages = messages.slice(
        -currentLength - PAGE_SIZE,
        -currentLength
      );
      setDisplayedMessages([...newMessages, ...displayedMessages]);
      scrollToBottom();
    }
  };

  const handleScroll = () => {
    const scrollTop = chatBoxRef.current.scrollTop;
    if (scrollTop === 0) handleLoadMore();
  };

  return (
    <>
      <Paper style={{ maxWidth: "600px" }} elevation={6}>
        <Box
          sx={{
            height: "80px",
          }}
        >
          <Typography variant="h4" style={{ padding: "20px 16px" }}>
            Chat ({userName})
          </Typography>
        </Box>
        <Box
          ref={chatBoxRef}
          sx={{
            borderTop: 1,
            borderBottom: 1,
            borderColor: "grey.500",
            height: "500px",
            padding: "16px",
            overflow: "auto",
          }}
          onScroll={handleScroll}
        >
          {displayedMessages.map((message, index) => {
            if (message.sender !== userName) {
              return (
                <li
                  key={index}
                  style={{
                    ...commonStyle.messageListItem,
                  }}
                >
                  <LeftMessage
                    sender={message.sender}
                    content={message.content}
                  ></LeftMessage>
                </li>
              );
            } else {
              return (
                <li
                  key={index}
                  style={{
                    ...commonStyle.messageListItem,
                  }}
                >
                  <RightMessage
                    sender={"You"}
                    content={message.content}
                  ></RightMessage>
                </li>
              );
            }
          })}
        </Box>
        <div style={{ padding: "16px" }}>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={10}>
                <TextField
                  id="messageInput"
                  label="Type your message"
                  variant="outlined"
                  fullWidth
                  value={newMessage}
                  onChange={(event) => setNewMessage(event.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ padding: "12px 20px", margin: "4px" }}
                  onClick={handleSendMessage}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
    </>
  );
};

export default App;
