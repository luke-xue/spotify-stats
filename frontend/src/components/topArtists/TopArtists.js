import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./TopArtists.css";
import { Helmet } from "react-helmet";

function TopArtists() {
  return (
    <div className="background">
      <Helmet><title>Vocalize - Top Artists</title></Helmet>
      <h1>Top Artists</h1>
      <div className="navbar">
        <Button
          component={Link}
          to="month"
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
          to="year"
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
          to="all"
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

export default TopArtists;
