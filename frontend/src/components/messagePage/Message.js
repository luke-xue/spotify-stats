import { Card } from "@mui/material";

function Message(props) {

  return (
    <Card
    >
      <h5><strong>{props.user}</strong>:</h5>
      <p>{props.messages}</p>
    </Card>
  );
}

export default Message;