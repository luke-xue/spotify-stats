import { Card, CardContent, Button } from "@mui/material";
import React from "react";
import { AccessTokenContext } from "../../Contexts/accessTokenContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { UserContext } from "../../Contexts/UserContext";
import 'bootstrap/dist/css/bootstrap.css';
import { Helmet } from "react-helmet";


const Login = (props) => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);
  const { user, setUser } = useContext(UserContext);

  const onClick = (e) => {
    fetch("http://localhost:9000/spotify")
      .then((res) => res.json())
      .then((data) => {
        window.open(data.url);
      });
  };

  const path = window.location.href.split("/")[3];
  let code = "";

  useEffect(() => {
    if (path) {
      code = path.split("=")[1];
      fetch("http://localhost:9000/spotify/callback?code=" + code)
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            setAccessToken(data.token);
            fetch("http://localhost:9000/spotify/user?temp=" + data.token)
              .then((res) => res.json())
              .then((meta) => {
                console.log(meta.display_name);
                fetch(
                  "http://localhost:9000/spotify/userCreation?token=" + data.token,
                  {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name: meta.display_name}),
                  }
                ).then((res) => console.log(res.json()))
                setUser(meta.display_name);
                navigate("/home");
              });
            console.log("token is set");
          }
        });
    }
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(#e66465, #9198e5)",
        height: "100vh",
        marginTop: 0,
        position: "fixed",
        width: "100vw",
      }}
    >
      <Helmet>
        <title>
          Vocalize - Login
        </title>
      </Helmet>
      <div>
        <Card
          sx={{
            borderRadius: "20px",
            variant: "outlined",
            boxShadow: 7,
            maxWidth: 400,
            minHeight: 100,
            justifyContent: "center",
            margin: "auto",
            marginTop: "30vh",
            backgroundColor: "#9AD896",
          }}
        >
          <CardContent>
            <Container
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "20vh", minWidth: "10vw" }}
            >
              <Button
                Button variant="text" sx = {{backgroundColor: "transparent", color: "black", fontSize: "22px" }}onClick={(e) => onClick(e)}
              >
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+U3BvdGlmeV9JY29uX1JHQl9HcmVlbjwvdGl0bGU+PHBhdGggZD0iTTE1LjU4OCA5LjA5NEMxMi40MyA3LjIyIDcuMjIzIDcuMDQ3IDQuMjA4IDcuOTZjLS40ODMuMTQ4LS45OTQtLjEyNS0xLjE0LS42MS0uMTQ4LS40ODMuMTI1LS45OTUuNjEtMS4xNDIgMy40Ni0xLjA1IDkuMjEtLjg0NyAxMi44NDUgMS4zMS40MzYuMjYuNTguODIuMzIgMS4yNTYtLjI1OC40MzUtLjgyLjU4LTEuMjU1LjMyem0tLjEwMyAyLjc3N2MtLjIyMi4zNi0uNjkyLjQ3My0xLjA1LjI1My0yLjYzMy0xLjYxOC02LjY0Ni0yLjA4Ny05Ljc2LTEuMTQyLS40MDQuMTIzLS44My0uMTA0LS45NTMtLjUwOC0uMTIyLS40MDMuMTA2LS44My41MS0uOTUyIDMuNTU2LTEuMDggNy45OC0uNTU3IDExLjAwMiAxLjMuMzYuMjIyLjQ3Mi42OTMuMjUgMS4wNXptLTEuMiAyLjY2OGMtLjE3NS4yOS0uNTUuMzgtLjgzOC4yMDMtMi4zLTEuNDA0LTUuMTk1LTEuNzIyLTguNjA0LS45NDMtLjMzLjA3NS0uNjU2LS4xMy0uNzMtLjQ2LS4wNzctLjMyOC4xMy0uNjU1LjQ1OC0uNzMgMy43MzItLjg1MyA2LjkzMi0uNDg2IDkuNTE0IDEuMDkyLjI4OC4xNzQuMzc4LjU1LjIwMi44Mzh6TTkuNzk2LjQxQzQuMzg1LjQxIDAgNC43OTcgMCAxMC4yMDYgMCAxNS42MTUgNC4zODUgMjAgOS43OTUgMjBzOS43OTQtNC4zODUgOS43OTQtOS43OTVTMTUuMjAzLjQxIDkuNzk0LjQxeiIgZmlsbD0iIzREQjA1QiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+"></img>
                Connect with Spotify
              </Button>
            </Container>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
