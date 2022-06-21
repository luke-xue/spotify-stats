import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import { OtherContext } from "../../Contexts/OtherContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  AppBar,
  Paper,
  Grid,
  styled,
  List,
  ListItem,
  ListItemText,
  Divider,
  CardActionArea,
  CardMedia,
  CardContent,
  ListItemAvatar,
  ListItemButton,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState, useRef, useContext } from "react";
import './HomePage.css'
import { Helmet } from "react-helmet";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

const commonStyles = {
  bgcolor: "white",
  m: 1,
  width: "80vh",
};

const HomePage = (props) => {
  const [users, setUsers] = useState([]);
  const { other, setOther } = useContext(OtherContext);

  const printUsers = async () => {
    fetch("http://localhost:9000/profile/info?myParam=10")
      .then((res) => res.json())
      .then((text) => {
        setUsers(text.result);
        console.log(text);
      });
  };

  useEffect(() => {
    printUsers();
  }, []);

  let navigate = useNavigate(); 

  const onClick = (event, name) => {
    event.preventDefault();
    setOther(name)
    navigate('/otherprofile');
  };

  return (
    <>
    <Helmet><title>Vocalize - Home</title></Helmet>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "10vh" }}
      >
        <List
          sx={{ ...commonStyles, borderRadius: "4px" }}
          component="nav"
          aria-label="mailbox folders"
        >
          {users.map((user) => {
            console.log(user);
            return (
              <div>
                <ListItem
                  disablePadding
                >
                  <ListItemButton onClick={
                    (e) => onClick(e, user.name)}>
                    <ListItemAvatar>
                      <Avatar
                        alt={'example'}
                        src={'source'}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                    />
                  </ListItemButton>
                </ListItem>
                {/*<ListItem onClick={(e) => onClick(e)}>
                  <ListItemText primary={<p>{user.user}</p>} fontSize="1em"/>
            </ListItem>*/}
                <Divider light />
              </div>
            );
          })}
        </List>
      </Grid>
      {/*<Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          px: 3,
          margin: "auto",
        }}
      >
        <StyledPaper
          sx={{
            my: 3,
            mx: "auto",
            p: 10,
          }}
        >
          <Card>

          </Card>
        </StyledPaper>
        <StyledPaper
          sx={{
            my: 3,
            mx: "auto",
            p: 10,
          }}
        ></StyledPaper>
        <StyledPaper
          sx={{
            my: 3,
            mx: "auto",
            p: 10,
          }}
        ></StyledPaper>
        </Box>*/}
    </>
  );
};

export default HomePage;
