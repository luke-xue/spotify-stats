import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { AppBar } from "@mui/material";
import "./Navbar";
import { ThemeProvider, createMuiTheme } from '@mui/material'
import {
  Drawer,
  Box,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import MessageIcon from '@mui/icons-material/Message';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const Navbar = (props) => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Rubik',
        'Libre Baskerville',
      ].join(','),
    },});
  return (
    <ThemeProvider theme={theme}>
    <div className="fonts">
      <Box>
        <Drawer
          PaperProps={{
            sx: { width: "12%", padding: "1%", paddingTop: "10%" },
          }}
          elevation={16}
          anchor="left"
          open={true}
          variant="persistent"
        >
          <Button sx={{margin: 2}} variant={useLocation().pathname === "/home" ? "outlined" : "text"} component={Link} to="/home" startIcon={useLocation().pathname === "/home" ? <HomeIcon style={{ fontSize: 35 }}/> : <HomeOutlinedIcon style={{ fontSize: 35 }}/>}>
            <Typography>Home</Typography>
          </Button>
          <Button sx={{margin: 2}} variant={useLocation().pathname === "/liked" ? "outlined" : "text"} component={Link} to="/liked" startIcon={useLocation().pathname === "/liked" ? <FavoriteIcon style={{ fontSize: 35 }}/> : <FavoriteBorderOutlinedIcon style={{ fontSize: 35 }}/>}>
            Liked Songs
          </Button>
          <Button sx={{margin: 2}} variant={useLocation().pathname === "/top" ? "outlined" : "text"} component={Link} to="/top" startIcon={useLocation().pathname === "/top" ? <BarChartIcon style={{ fontSize: 35 }}/> : <BarChartOutlinedIcon style={{ fontSize: 35 }}/>}>
            Top Songs
          </Button>
          <Button sx={{margin: 2}} variant={useLocation().pathname === "/artists" ? "outlined" : "text"} component={Link} to="/artists" startIcon={useLocation().pathname === "/artists" ? <PersonIcon style={{ fontSize: 35 }}/> : <PersonOutlinedIcon style={{ fontSize: 35 }}/>}>
            Top Artists
          </Button>
          <Button sx={{margin: 2}} variant={useLocation().pathname === "/messages" ? "outlined" : "text"} component={Link} to="/messages" startIcon={useLocation().pathname === "/messages" ? <MessageIcon style={{ fontSize: 35 }}/> : <MessageOutlinedIcon style={{ fontSize: 35 }}/>}>
            Messages
          </Button>
          <Button sx={{margin: 2}} variant={useLocation().pathname === "/forums" ? "outlined" : "text"} component={Link} to="/forums" startIcon={useLocation().pathname === "/forums" ? <ForumIcon style={{ fontSize: 35 }}/> : <ForumOutlinedIcon style={{ fontSize: 35 }}/>}>
            Forums
          </Button>
        </Drawer>
      </Box>
    </div>
    </ThemeProvider>
  );
};

export default Navbar;