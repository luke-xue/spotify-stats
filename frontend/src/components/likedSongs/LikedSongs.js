import React from "react";
import "./LikedSongs.css";
import { Typography, Card, CardContent, Box, Button } from "@mui/material";
import { AccessTokenContext } from "../../Contexts/accessTokenContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import CardActions from "@mui/material/CardActions";
import { Helmet } from "react-helmet";

function LikedSongs() {
  const { accessToken } = useContext(AccessTokenContext);
  const [longTermSongs, setLongTermSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/users/likedsongs?token=" + accessToken)
      .then((res) => res.json())
      .then((data) => {
        setLongTermSongs(data.items);
      });
  }, []);

  return (
    <div className="background">
      <Helmet><title>Vocalize - Liked Songs</title></Helmet>
      <h1>Liked Songs</h1>
      {longTermSongs.length > 0 &&
        longTermSongs.map((val, key) => {
          return (
            <Box sx={{ mx: "auto", width: 500, p: 2 }}>
              <Card
                variant="outlined"
                style={{ margin: "0 auto", display: "flex" }}
              >
                <img
                  src={val.track.album.images[0].url}
                  height="300"
                  width="300"
                  alt="album cover"
                />
                <div>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 18 }}
                      color="text.primary"
                      gutterBottom
                    >
                      {val.track.name} by {val.track.artists[0].name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      href={val.track.preview_url}
                      target="_blank"
                      variant="outlined"
                      style={{ margin: "0 auto", display: "flex" }}
                    >
                      Preview Song
                    </Button>
                  </CardActions>
                </div>
              </Card>
            </Box>
          );
        })}
    </div>
  );
}

export default LikedSongs;
