import React, { useContext, useEffect } from "react";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Context } from "../context/Context";

//component to read story and options
const ReadingPage = () => {
    //all the state used in this component
    const {
        userStoryId,
        storySection,
        choicesTime,
        setChoicesTime,
        storySectionId,
        seeOptions,
        setOptionId,
        optionId,
        setResultingStorySectionId,
        resultingStorySectionId,
        options,
        readCompleteStory,
        end,
        saveOption,
        isTitle
    } = useContext(Context);

    return (
      //box in which story is read; always rendered
      <Box
      //uses theme to set text color blue-purple
      color="primary.contrastText" 
      //sets this Box element as a main HTML element
      component="main"
      style={{paddingBottom: "50px"}}
      >
        {/* box displays title */}
        <Box className="title"> 
            <Box style={{ margin: "15px"}}>
                <Typography
                // uses theme to establish styles for h1 
                variant="h1"
                color="main.contrastText"
                > 
                  {/* title pulled from state */}
                  {isTitle}
                </Typography>
            </Box>
        </Box>
        {/* box displays reading text, story sections */}
        <Box className="readBox"> 
          <Paper 
          elevation={9}
          className="readPaper"
          >
            <Box>
              <Typography 
              variant="h3"
              className="readingText" 
              component="div">
                {/* story section pulled from state */}
                {storySection}
              </Typography>
            </Box>
          </Paper>
        </Box>
          {/* dynamically render the choices based on when the choices button is clicked
          this was also "clinical" decision, as I wanted to encourage users to read the story before scanning down to read the options*/}
          {(!choicesTime)
            ?<Box className="seeChoicesButtonBox">
              <Button
                variant="contained"
                className="seeChoicesButton"
                onClick={(e)=>{
                    console.log("storySectionId when see choices was clicked: ", storySectionId)
                    seeOptions(storySectionId)
                }}
              > 
                {/* default for this button is what's next - a story section
                dynamically rendered to display Read My Story when there are no options left */}
                {(end == false)
                  ?<Typography variant="h4">
                    What's next?
                  </Typography>
                  : <Link 
                      onClick={(e) => {
                        readCompleteStory(userStoryId)
                      }}
                      to="/wholeStory"
                    >
                      Read My Story
                    </Link>
                }
              </Button>
            </Box> 
            // When choicesTime is true, choices display
          :<Box className="choicesContainerBox">
            {/* map over and display options */}
            {options.map((option, index)=>
              <Box 
              variant="h3" 
              className="buttonJar"
              > 
                <Typography
                  className="choicesButtons"
                  onMouseDown={(e) =>{
                    // set the chosen option to be saved to the complete story
                    setOptionId(option.option_id)
                    // set the reulsting story section so it can be read 
                    // and later saved to the complete story
                    setResultingStorySectionId(option.resulting_story_section_id)
                  }}
                  onClick={(e) => {
                    //reset choicesTime so the choices do not render
                    setChoicesTime(false)
                    //save the option to the complete story
                    saveOption()
                  }}
                >
                  {option.option_content}
                </Typography>
              </Box>
            )}
          </Box>
        }           
      </Box>
    )
}

export default ReadingPage