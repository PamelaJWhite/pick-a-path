import * as React from 'react';
import { useContext } from 'react';
import {Link} from "react-router-dom";


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Context } from "../context/Context";

export default function ButtonAppBar() {
  const {
    isSignedIn,
    handleLogOut,
    readCompleteStory,
    userStoryId,
    setWholeStory,
    resetStoryState,
    isDrawerOpen,
    setIsDrawerOpen
} = useContext(Context);

  // console.log("isSignedIn: ", isSignedIn)

  return (
    // <ThemeProvider theme={theme}>
    isSignedIn && (
      <Box 
        sx={{ flexGrow: 1 }}
        // bgcolor="primary.main"


      >
        <AppBar 
          position="static"
          // bgcolor="primary.main"
        >
          <Toolbar
          style={{ display: "flex", justifyContent:"flex-end", marginBottom:"-10px"}}
          >
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
              <Drawer 
                
                style={{ display: "flex", justifySelf: "flex-end", position: "relative" }}
                anchor="right"
                open={isDrawerOpen} 
                PaperProps={{ style: { height: "140px", width: "140px" }}}
                onClose={() => setIsDrawerOpen(false)
              }>
            <List>
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
    // </ThemeProvider>
    
  );
}




{/* {isSignedIn && (
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
                <Link
                              onClick={(e) => {
                                  readCompleteStory(userStoryId)
                              }}
                              to="/wholeStory"
                          >
                              See your complete story
                          </Link>
              </Typography>
            )}*/}