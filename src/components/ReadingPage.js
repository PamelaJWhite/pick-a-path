import React, { useContext } from "react";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { Context } from "../context/Context";

const ReadingPage = () => {
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
        readNextSection,
        options,
        readCompleteStory,
        saveOption
    } = useContext(Context);
    
// console.log("made it to reading rainbow. userStoryId: ", userStoryId)

    return (
        <main>
            <Box
                sx={{
                    display: 'flex',
                    // flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1,
                    width: "49%",
                    height: 400,
                    },
                }}
            > 
                <Paper elevation={2}>
                    <div>
                        <p variant="h3" component="div" sx={{ paddingBottom: 5 }}>
                            {storySection}
                        </p>
                    </div>
                </Paper>
            </Box>
            {/* this is going to be an if/ else or ternary operator */}
            {(!choicesTime)
                ?<Button
                onClick={(e)=>{
                    // console.log("button clicked")
                    setChoicesTime("true")
                    seeOptions(storySectionId)
                }}
            > 
                see choices</Button>
            :<div>
                {options.map((option, index)=>
                    // console.log("option, index: ", option, index)
                    <Button
                        onMouseDown={(e) =>{
                            setOptionId(option.option_id)
                            setResultingStorySectionId(option.resulting_story_section_id)
                        }}
                        onClick={(e) => {

                            //Actually, I think that passing userStoryId and resultingStorySEctionId is redundant
                            //I think that the function in the Context file has access to them
                            //but I'm tempted to leave it this way
                            //just bc a) it makes it clear what the function needs
                            //b) I feel more certain it will be right
                            setChoicesTime(false)
                            saveOption(userStoryId, storySectionId, optionId, resultingStorySectionId)
                        }}
                    >
                        {option.option_content}
                    </Button>
                )}
                <Link
                        onClick={(e) => {
                            readCompleteStory(userStoryId)
                        }}
                        to="/wholeStory"
                    >
                        See your complete story
                    </Link>
                    
            </div>
            }           
            
        </main>
    )
}

export default ReadingPage