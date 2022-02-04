import React, { useContext} from "react";

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Context } from "../context/Context";

//component to read user's complete story
const WholeStory = () => {
  
  //destructure context for only the states and functions needed
  const {
      wholeStory,
      isTitle
  } = useContext(Context);

  return (
    <Box
      component="main" 
      style={{ marginBottom:"50px" }}
    >
      {/* display title */}
      <div className="title"> 
        <Box style={{ margin: "15px"}}>
            <Typography 
              variant="h1"
              color="#26349C"
            >
              {isTitle}
            </Typography>
        </Box>
      </div>
      {/* display complete story */}
      <Paper 
        className="readPaperWhole" 
        elevation={9}>
        <Typography variant="h3"
          color="#26349C" 
          className="readingText"
        >
          {wholeStory}
        </Typography>
      </Paper>
    </Box>
  );
};

export default WholeStory