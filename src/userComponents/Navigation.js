
import * as React from 'react';
import { useContext } from 'react';
import {Link} from "react-router-dom";


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

import { Context } from "../context/Context";

//Navigation component
export default function ButtonAppBar() {
  //save pieces of state used in this component, destructured
  const {
    isSignedIn,
    handleLogOut,
    resetStoryState,
    isDrawerOpen,
    setIsDrawerOpen
} = useContext(Context);

  return (
    
    
    //dynamically rendered to show once a user is signed in
    //I chose to do this for now, since there is no brand icon to show in the nav bar
    //nor does the menu do anything before login, since it only has Home and Logout
    isSignedIn && (
      <Box 
        sx={{ flexGrow: 1 }}
      > 
        <AppBar 
          position="static"
        >
          <Toolbar
          style={{ display: "flex", justifyContent:"space-between", marginBottom:"-10px"}}
          >
            {/* menu icon is clicked to set isDrawerOpen to true */}
            <Typography >
              <img
                style={{height:"38px"}}
                src="/12400355581586788052-64.png"
              ></img>
            </Typography>
            <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setIsDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
          </Toolbar>
        </AppBar>
        <Box 
        style={{ display: "flex", justifyContent:"flex-end"}}>
          {/* menu opens when isDrawerOpen is true
          currently anchored on the right, slides in from the right */}
          <Drawer 
            style={{ display: "flex", justifySelf: "flex-end", position: "relative" }}
            anchor="right"
            open={isDrawerOpen} 
            PaperProps={{ style: { height: "140px", width: "140px" }}}
            onClose={() => setIsDrawerOpen(false)
          }>
            <List>
              {/* home button sends user back to their story titles page
                resets several pieces of state 
                set as Link so it does not reset ALL state*/}
              <ListItem>
                <ListItemButton
                  color="inherit"
                  onClick={()=>{resetStoryState()}}
                >
                  <Link
                    to="/userStories">
                    Home
                  </Link>
                </ListItemButton>
              </ListItem>
              {/* log Out to return to login page */}
              <ListItem>
                <ListItemButton
                  color="inherit"
                  onClick={()=>{handleLogOut()}}>
                    <ListItemText primary="Log Out" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
        </Box> 
      </Box> 
    )
  );
}
