import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import {Helmet} from "react-helmet";
import {
  AppBar,
  Box,
  IconButton,
  Card,
  InputBase,
  Paper,
  Grid,
  TextField,
  Button
} from "@mui/material";
import { useEffect, useState, useRef, useContext } from "react";
import MessageBody from "./MessageBody";
import RefreshIcon from "@mui/icons-material/Refresh";
import Messengers from "./Messengers";
import { UserContext } from '../../Contexts/UserContext';

const Messages = () => {


  const textFieldRefMessage = useRef(null);
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [nothing, setNothing] = useState(false);
  const [messengers, setMessengers] = useState([]);
  const [messenger, setMessenger] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9000/spotify/messengers?id=" + user)
      .then((res) => res.json())
      .then((text) => {
        for(let i = 0; i < text.result.length; i++) {
          if (text.result[i].id === user) {
            text.result.splice(i, 1);
            i--
          }
        }
        setMessengers(text.result);
  })
      .catch((err) => console.log(err));
  }, []);

useEffect(() => {
  fetch("http://localhost:9000/spotify/messages?user=" + messenger + "&id=" + user)
      .then((res) => res.json())
      .then((text) => {
        for(let i = 0; i < text.result.length; i++) {
          console.log(text.result[0]);
          if (text.result[i].created) {
            text.result.splice(i, 1);
            i--
          }
        }
        if (text.result.length === 0) {
          setNothing(true);
        }
        if (text.result.length !== 0) {
          setNothing(false);
        }
        setMessages(text.result);
      })
      .catch((err) => console.log(err));
}, [messenger]);

  const updateMessages = () => {
    fetch("http://localhost:9000/spotify/messages?user=" + messenger + "&id=" + user)
      .then((res) => res.json())
      .then((text) => {
        for(let i = 0; i < text.result.length; i++) {
          console.log(text.result[0]);
          if (text.result[i].created) {
            text.result.splice(i, 1);
            i--
          }
        }
        if (text.result.length === 0) {
          setNothing(true);
        }
        if (text.result.length !== 0) {
          setNothing(false);
        }
        setMessages(text.result);
      })
      .catch((err) => console.log(err));
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const newMessage = {
      content: textFieldRefMessage.current.value,
    };
    fetch("http://localhost:9000/spotify/message?from=" + user + "&to=" + messenger, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessage)
    });

    textFieldRefMessage.current.value = "";
  };

  return (
    <>
    <Helmet><title>Vocalize - Messaging</title></Helmet>
      <AppBar color="primary">
        <Box>
          <IconButton size="large" aria-label="back" variant="contained">
            <ArrowBackIosIcon color="secondary" />
          </IconButton>
          <IconButton size="large" aria-label="forward" variant="contained">
            <ArrowForwardIosIcon color="secondary" />
          </IconButton>
        </Box>
      </AppBar>

      <Card
        sx={{
          bgcolor: "white",
          marginTop: "3%",
          marginLeft: "30%",
          marginRight: "25%",
          paddingBottom: "29.5%",
          boxShadow: 7,
          borderRadius: 2,
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Messengers"
                inputProps={{ "aria-label": "search person" }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Typography>
            <h4><strong>{messenger}</strong>:</h4>
              <IconButton onClick={updateMessages}>
                <RefreshIcon />
              </IconButton>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Messengers
              messengers={messengers}
              setMessenger={setMessenger}
            ></Messengers>
          </Grid>
          <Grid item xs={6}>
            <MessageBody messages={messages} nothing={nothing}></MessageBody>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Send a Message"
              variant="standard"
              inputRef={textFieldRefMessage}
            >
            </TextField>
            <IconButton onClick={sendMessage}>
                <SendIcon />
              </IconButton>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Messages;
