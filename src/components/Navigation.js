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


// import MenuIcon from '@mui/icons-material/Menu';

import { Context } from "../context/Context";

const theme = createTheme({
  typography: {
      h1: {
          fontSize: 50,
      },
      h2: {
          fontSize: 35,
      },
      h3: {
          fontSize: 25,
      },
      h4: {
          fontSize: 17,
      },
      fontFamily: "Poppins"
  },
});

export default function ButtonAppBar() {
  const {
    isSignedIn,
    handleLogOut,
    readCompleteStory,
    userStoryId,
    setWholeStory,
    resetStoryState
} = useContext(Context);

  // console.log("isSignedIn: ", isSignedIn)

  return (
    <ThemeProvider theme={theme}>
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
                <Link
                              onClick={(e) => {
                                  readCompleteStory(userStoryId)
                              }}
                              to="/wholeStory"
                          >
                              See your complete story
                          </Link>
              </Typography>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
    
  );
}