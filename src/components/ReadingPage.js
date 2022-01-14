import React, { useContext } from "react";

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
        setResultingStorySection,
        readNextSection,
        options
    } = useContext(Context);
    
console.log("made it to reading rainbow. userStoryId: ", userStoryId)

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
                    console.log("button clicked")
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
                            setResultingStorySection(option.resulting_story_section)
                        }}
                        onClick={(e) => {
                            readNextSection(userStoryId)
                        }}
                    >
                        {option.option_content}
                    </Button>
                )}
            </div>
            }           
            
        </main>
    )
}

export default ReadingPage