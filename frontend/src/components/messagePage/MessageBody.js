import EmptyMessage from "./EmptyMessage";
import Message from "./Message";
import { Input, InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MessageBody = (props) => {
  return (
    <div>
      {props.nothing && <EmptyMessage />}
      {props.messages.map((message) => (
        <Message
          messages={message.content}
          user={message.user}
          key={message.user}
        />
      ))}
    </div>
  );
};

export default MessageBody;
