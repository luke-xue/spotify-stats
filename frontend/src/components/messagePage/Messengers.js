import { Stack } from "@mui/material";
import Messenger from "./Messenger";

const Messengers = (props) => {
  return (
    <Stack>
      {props.messengers.map((messenger) => (
        <Messenger update = {props.update} user={messenger.id} setMessenger = {props.setMessenger} key={messenger.id}/>
      ))}
    </Stack>
  );
};

export default Messengers;
