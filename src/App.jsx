import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, loadMessages } from "./store/chat/chatSlice";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { LeftMessage, RightMessage } from "./components/Message";

const commonStyle = {
  messageListItem: {
    listStyleType: "none",
    display: "inline-block",
    width: "100%",
  },
};

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
          sx={{
            borderTop: 1,
            borderBottom: 1,
            borderColor: "grey.500",
            height: "500px",
            padding: "16px",
            overflow: "auto",
          }}
        >
          {messages.map((message, index) => {
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
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <TextField
                label="Type your message"
                variant="outlined"
                fullWidth
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
        </div>
      </Paper>
    </>
  );
};

export default App;
