import React, { useContext} from "react";
import {Link} from "react-router-dom";

//import MUI compoenents
import Paper from '@mui/material/Paper';

//import context
import { Context } from "../context/Context";


const WholeStory = () => {
    //create variable name to access styles
    // const classes = useStyles();

    //destructure context for only the states and functions needed
    const {
        wholeStory,
        getAllStoryTitles,
        storyData,
        getMyStoryTitles,
        myStoryTitles,
        postToMyStoryTitlesList,
        deleteTitle,
        userStoryId,
        setUserStoryId,
        readFirstStorySection,
        isSignedIn, 
        setIsSignedIn
    } = useContext(Context);

    //!this can't stay in here
    //it's here bc I couldn't figure out login
    setIsSignedIn(true)

    
    return (
        <main className="{classes.formContainer}" style={{backgroundColor:"pink"}}>
            <Paper elevation={3}>
                <p>
                    {wholeStory}
                </p>
            </Paper>
            
        </main>
    );
};

export default WholeStory