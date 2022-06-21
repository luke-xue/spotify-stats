import { Button } from "@mui/material";

const Messenger = (props) => {

  const clicked = () => {
    props.setMessenger(props.user);
    props.update();
  }

  return (
    <Button variant='text' onClick={clicked}>
      {props.user}
    </Button>
  );
}

export default Messenger;
