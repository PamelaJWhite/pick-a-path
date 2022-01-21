import React, { useContext} from "react";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


//import context
import { Context } from "../context/Context";
import { getDividerUtilityClass } from "@mui/material";

//create styles for this component
const useStyles = makeStyles({
    formContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        },
    foaasResponse: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    textField: {
        width: "100%",
    },
    spacer: {
        height: 15,
    },
});

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
    window.history.go(1);
    };
const UserStories = () => {
    
    //create variable name to access styles
    // const classes = useStyles();

    //destructure context for only the states and functions needed
    const {
        getAllStoryTitles,
        storyData,
        getMyStoryTitles,
        myStoryTitles,
        postToMyStoryTitlesList,
        deleteTitle,
        userStoryId,
        setUserStoryId,
        readFirstStorySection,
        readCompleteStory,
        wholeStory,
        isSignedIn, 
        setIsSignedIn
    } = useContext(Context);

    //!this can't stay in here
    //it's here bc I couldn't
    setIsSignedIn(true)

    //when I had this getAllStoryTitles function here,
    //outside the return
    //I think it was calling hundreds of times
    //as I worked
    // getAllStoryTitles()

    return (
        <main className="{classes.formContainer}" style={{backgroundColor:"pink"}}>
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
            {storyData && (
        <div>
            <div variant="h3" component="div" sx={{ paddingBottom: 5 }}>
                {storyData.map((element, idx)=>(
                    <ul>
                        <li 
                            className="storyTitlesList"
                            onClick={(e) => {
                            let storyId = element.story_id
                            console.log("wholeStory: ", wholeStory)
                            postToMyStoryTitlesList(storyId) 
                            }
                        }>
                            {element.title}
                            </li>
                    </ul>
                ))}
            </div>
        </div>
        )}
        </Paper>
        <Paper elevation={2}>
            {myStoryTitles && (

                <div>
                    <div variant="h3" component="div" sx={{ paddingBottom: 5 }}>
                        {myStoryTitles.map((element, idx)=>(
                            <ul>
                                <li 
                                    className="storyTitlesList" 
                        
                                >
                                    <Link 
                                        onMouseDown={(e) =>{
                                            setUserStoryId(element.user_story_id)
                                        }}
                                        onClick={(e) => {
                                            //go to readCompleteStory first
                                            //b/c we only want to read the first story section
                                            //if there is no story already saved
                                            readFirstStorySection(userStoryId)

                                        }}
                                        to={"/readingPage"}
                                    >
                                        {element.title}
                                        
                                    </Link>
                                    <Grid container sx={{ color: 'text.primary' }}>
                                        <Grid item xs={8}>
                                            <DeleteForeverIcon 
                                                className="deleteIcons"
                                                onClick={(e) => {
                                                    let userStoryId = element.user_story_id
                                                    // console.log("deleteTitle element.user_story_id and element.title: ", element.user_story_id, element.title)
                                                    deleteTitle(userStoryId)
                                                    }}
                                            />
                                        </Grid>
                                    </Grid>
                                    </li>
                            </ul>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
        </Box>
            {/* this is set up as a button
            because I think it was making hundreds of calls
            when i had the get request functions 
            run on loading */}
            <Button
                variant="contained"
                style={{backgroundColor:"pink"}}
                onClick={() => {
                    // console.log("I'm clicked")
                    getAllStoryTitles()
                    getMyStoryTitles()
                    }
                }
            >
                click me
            </Button> 
            {/* <Button
                variant="contained"
                style={{backgroundColor:"pink"}}
                onClick={() => {
                    postToMyStoryTitlesList()
                    }
                }
            >
                post button
            </Button> */}
        </main>
    );
};

export default UserStories

    // {/* Only displays text after successful api call
    //     {foaas && (
    //         <div className={classes.foaasResponse}>
    //         <Typography variant="h3" component="div" sx={{ paddingBottom: 5 }}>
    //             {foaas.message}
    //         </Typography>
    //         <Typography variant="h5" component="div" sx={{ paddingBottom: 15 }}>
    //             {foaas.subtitle}
    //         </Typography>
    //         </div>
    //     )}
    //     {/* Displays appropriate text fields depending on which api endpoint is selected */}
    //     {!foaas && (
    //         <Typography
    //         variant="h4"
    //         component="div"
    //         sx={{ paddingBottom: 5, textAlign: "center" }}
    //         >
    //         Please fill out the following forms:
    //         </Typography>
    //     )}
    //     {needsName && !foaas && (
    //         <>
    //         <TextField
    //             className={classes.textField}
    //             id="userName_field"
    //             value={name}
    //             onChange={(e) => setName(e.target.value)}
    //             variant="outlined"
    //             placeholder="Name"
    //         />
    //         <div className={classes.spacer}></div>
    //         </>
    //     )}
    //     {needsFrom && !foaas && (
    //         <>
    //         <TextField
    //             className={classes.textField}
    //             id="userName_field"
    //             value={from}
    //             onChange={(e) => setFrom(e.target.value)}
    //             variant="outlined"
    //             placeholder="From"
    //         />
    //         <div className={classes.spacer}></div>
    //         </>
    //     )}
    //     {needsThing && !foaas && (
    //         <>
    //         <TextField
    //             className={classes.textField}
    //             id="userName_field"
    //             value={thing}
    //             onChange={(e) => setThing(e.target.value)}
    //             variant="outlined"
    //             placeholder="Thing"
    //         />
    //         <div className={classes.spacer}></div>
    //         </>
    //     )}
    //     {/* Dynamical renders button content and onClick function */}
    //     <Button
    //         variant="contained"
    //         onClick={() => (!foaas ? handleFOAAS() : resetFOAAS())}
    //     >
    //         {!foaas ? "Submit" : "Another?"}
    //     </Button>
    //     </div> */}

     // const {
    //     needsName,
    //     setNeedsName,
    //     needsFrom,
    //     setNeedsFrom,
    //     needsThing,
    //     setNeedsThing,
    //     name,
    //     setName,
    //     from,
    //     setFrom,
    //     thing,
    //     setThing,
    //     foaas,
    //     setFoaas,
    //     handleFOAAS,
    //     setRandomNumber,
    // } = useContext(Context);

    //local function to reset api
    //sets context states individually
    // const resetFOAAS = () => {
    //     setFoaas(null);
    //     setNeedsName(false);
    //     setNeedsFrom(false);
    //     setNeedsThing(false);
    //     setName("");
    //     setFrom("");
    //     setThing("");
    //     setRandomNumber(Math.floor(Math.random() * 4) + 1);
    // };