import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "../topArtists/TopArtists.css"
import "./TopSongs.css"
import { Helmet } from "react-helmet";

function TopSongs() {
  return (
    <div className="background">
      <Helmet><title>Vocalize - Top Songs</title></Helmet>
      <h1>Top Songs</h1>
      <div className="navbar">
        <Button
          component={Link}
          to="/top/month"
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
          to="/top/year"
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
          to="/top/all"
          variant="outlined"
          style={{
            borderRadius: 35,
            backgroundColor: "#FFFFFF",
          }}
        >
          All Time
        </Button>
      </div>
    </div>
  );
}

export default TopSongs;
