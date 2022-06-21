import {
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Button,
} from "@mui/material";
import React from "react";
import { AccessTokenContext } from "../../Contexts/accessTokenContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./TopArtists.css";

function ArtistsMonth() {
  const { accessToken } = useContext(AccessTokenContext);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/users/topartists/short?token=" + accessToken)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setArtists(data.items);
      });
  }, []);

  return (
    <div className="background">
      <h1>Past Month of Top Artists</h1>
      <div className="navbar">
        <Button
          component={Link}
          to="/artists/month"
          variant="outlined"
          style={{
            borderRadius: 35,
            backgroundColor: "#FFFFFF",
          }}
        >
          Past Month
        </Button>

        <Button
          component={Link}
          to="/artists/year"
          variant="outlined"
          style={{
            borderRadius: 35,
            backgroundColor: "#FFFFFF",
          }}
        >
          Past Year
        </Button>

        <Button
          component={Link}
          to="/artists/all"
          variant="outlined"
          style={{
            borderRadius: 35,
            backgroundColor: "#FFFFFF",
          }}
        >
          All Time
        </Button>
      </div>
      <div className="artistGrid">
        <Grid container>
          {artists.length > 0 &&
            artists.map((val, key) => {
              return (
                <Grid item xs={2.4} key={val.id}>
                  <Box sx={{ mx: "auto", width: 250, p: 1 }}>
                    <Card
                      variant="outlined"
                      style={{ margin: "0 auto", display: "flex" }}
                    >
                      <CardContent sx={{ justifyContent: "center" }}>
                        <img
                          src={val.images[0].url}
                          height="200"
                          width="200"
                          alt="artist pic"
                        />
                        <Typography
                          sx={{ fontSize: 18, justifyContent: "center" }}
                          color="text.primary"
                          gutterBottom
                        >
                          {val.name}
                        </Typography>
                        <Typography
                          sx={{ fontSize: 18 }}
                          color="text.primary"
                          gutterBottom
                        >
                          Followers: {val.followers.total}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
}

export default ArtistsMonth;
