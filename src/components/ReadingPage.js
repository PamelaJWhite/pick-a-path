import React, { useContext, useEffect } from "react";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import { Context } from "../context/Context";
import { createTheme, ThemeProvider } from '@mui/material/styles';


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
        end,
        saveOption
    } = useContext(Context);

    useEffect(()=>{
        // console.log("options changed: ", options)
    }, [options])
    
    
// console.log("made it to reading rainbow. userStoryId: ", userStoryId)

    return (
        // <ThemeProvider theme={theme}>
            <Box
            // bgcolor="primary.main" 

            color="primary.contrastText" 

            component="main"
            style={{paddingBottom: "50px"}}
            >
                <div className="title"> 
                    <Box style={{ margin: "15px"}}>
                        <Typography 
                        variant="h1"
                        color="main.contrastText"
                        > 

                            {/* !!Need to figure out how to get title! */}
                            Title Goes Here
                        </Typography>
                    </Box>
                </div>
                <Box className="readBox"
        
                    // sx={{
                    //     display: 'flex',
                    //     // flexWrap: 'wrap',
                    //     '& > :not(style)': {
                    //     m: 1,
                    //     width: "49%",
                    //     height: 400,
                    //     },
                    // }}
                > 
                    <Paper 
                    elevation={9}
                    className="readPaper"
                    style={{marginRight: "20px" }}
                    >
                        <Box>
                            <Typography 
                            variant="h3"
                            className="readingText" 
                            component="div">
                            {/* Cupcake ipsum dolor sit amet caramels sugar plum bonbon candy. Oat cake jelly-o bear claw apple pie powder wafer. Lollipop gingerbread fruitcake oat cake marzipan chocolate bar lemon drops powder cheesecake. Tootsie roll cookie danish candy liquorice sweet tootsie roll. Gingerbread liquorice chupa chups cotton candy sesame snaps jelly beans cookie. Chocolate topping tart carrot cake pastry cake lollipop cake tiramisu. Chocolate bar gummi bears cake apple pie candy canes. Powder chupa chups cookie gummies jelly-o gummi bears cheesecake topping. Gummies wafer chupa chups chocolate macaroon cake. Lemon drops powder macaroon jelly gingerbread bonbon dessert. */}
                                {storySection}
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
                {/* this is going to be an if/ else or ternary operator */}
                {(!choicesTime)
                    ?<Box className="seeChoicesButtonBox">
                        <Button
                            variant="contained"
                            className="seeChoicesButton"
                            onClick={(e)=>{
                                // console.log("see choices clicked")
                                console.log("storySectionId when see choices was clicked: ", storySectionId)
    
                                seeOptions(storySectionId)
                        }}
                        > {(end == false)
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
                    
                :<Box className="choicesContainerBox">
                    {/* <Box className="buttonJar">
                        <Typography variant="h3" className="choicesButtons">
                        1. Cupcake ipsum dolor sit amet fruitcake halvah dessert. Cheesecake jelly gummies dessert sesame snaps. 
                        </Typography>
                    </Box>
                    <Box className="buttonJar">
                        <Typography variant="h3" className="choicesButtons">
                        2. Cupcake ipsum dolor sit amet fruitcake halvah dessert. Cheesecake jelly gummies dessert sesame snaps. 2. Cupcake ipsum dolor sit amet fruitcake halvah dessert. Cheesecake jelly gummies dessert sesame snaps. 2. Cupcake ipsum dolor sit amet fruitcake halvah dessert. Cheesecake jelly gummies dessert sesame snaps. 
                        </Typography>
                    </Box>
                    <Box variant="h3" className="buttonJar">
                        <Typography className="choicesButtons">
                        1. Cupcake ipsum dolor sit amet fruitcake halvah dessert. Cheesecake jelly gummies dessert sesame snaps. 
                        </Typography>
                    </Box> */}
                    
                    {options.map((option, index)=>
                        // console.log("option, index: ", option, index)
                        <Box 
                        variant="h3" 
                        className="buttonJar"
                        >
                            <Typography
                                className="choicesButtons"
                                //bold did not work with class
                                // style={{ fontWeight: "bold" }}
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
                        
                            </Typography>
                        </Box>
                    )}
                    {/* <Link 

                            onClick={(e) => {
                                readCompleteStory(userStoryId)
                            }}
                            to="/wholeStory"
                        >
                            Read My Story
                        </Link> */}
                        
                </Box>
                }           
                
            </Box>
        // </ThemeProvider>
        
    )
}

export default ReadingPage