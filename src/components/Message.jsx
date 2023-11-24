import { Paper } from "@mui/material";

const commonStyle = {
  avatar: {
    width: "50px",
    height: "50px",
    border: "1px solid #808080",
    borderRadius: "50%",
  },
  message: {
    padding: "16px",
    maxWidth: "400px",
    lineBreak: "anywhere",
  },
};

export const LeftMessage = (props) => {
  const { sender, content } = props;

  return (
    <div>
      <div
        style={{
          ...commonStyle.avatar,
          float: "left",
        }}
      >
        <p style={{ textAlign: "center" }}>
          {sender.substring(0, 1).toUpperCase()}
        </p>
      </div>
      <div
        style={{
          float: "left",
          margin: "0px 16px 16px 16px",
        }}
      >
        <span>{sender}</span>
        <Paper
          elevation={6}
          style={{
            ...commonStyle.message,
            backgroundColor: "blue",
            color: "white",
          }}
        >
          {content}
        </Paper>
      </div>
    </div>
  );
};

export const RightMessage = (props) => {
  const { sender, content } = props;
  return (
    <div>
      <div
        style={{
          ...commonStyle.avatar,
          float: "right",
        }}
      >
        <p style={{ textAlign: "center" }}>{sender}</p>
      </div>
      <Paper
        elevation={6}
        sx={{
          ...commonStyle.message,
          float: "right",
          margin: "16px",
        }}
      >
        {content}
      </Paper>
    </div>
  );
};
