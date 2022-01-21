import * as React from 'react';
import { useContext } from 'react';
import {Link} from "react-router-dom";


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


// import MenuIcon from '@mui/icons-material/Menu';

import { Context } from "../context/Context";


export default function ButtonAppBar() {
  const {
    isSignedIn,
    handleLogOut,
    setWholeStory,
    resetStoryState
} = useContext(Context);

  // console.log("isSignedIn: ", isSignedIn)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Icon
          </Typography>
          {isSignedIn && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button 
                color="inherit"
                onClick={()=>{resetStoryState()}}
              > 
                  <Link
                    to="/userStories">
                      Home
                  </Link>
              </Button>
              <Button 
                color="inherit"
                onClick={()=>{handleLogOut()}}>
                  Log Out
              </Button>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}