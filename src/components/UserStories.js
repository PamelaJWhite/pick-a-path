import React, { useContext} from "react";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import {
    DataGridPro,
    useGridApiRef,
    gridVisibleRowCountSelector,
    visibleGridColumnsLengthSelector,
    visibleGridColumnsSelector,
    gridVisibleSortedRowIdsSelector,
} from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';
import Slide from '@mui/material/Slide';
import { createTheme, ThemeProvider } from '@mui/material/styles';


//import context
import { Context } from "../context/Context";
import { getDividerUtilityClass } from "@mui/material";

window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
window.history.go(1);
};

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
    },
});

export default function UserStories (props) {
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
    
    return (
        <ThemeProvider theme={theme}>
        <main  >
            <div className="title"> 
                <Box style={{ margin: "30px"}}>
                    <Typography variant="h1">
                        My Story Home
                    </Typography>
                </Box>
            </div>
                <Box className = "readBox">
                    <div className = "paperBox">
                        <Typography variant="h2">
                            All Stories
                        </Typography>
                        <Paper elevation={2} className="titlePaper" style={{marginRight: "20px" }}>
                            <div className = "clickToAdd">
                                <Typography variant="h4">Click Story to Add</Typography>
                            </div>
                            {storyData && (
                                <Typography variant="h3" component="div" sx={{ paddingBottom: 5 }}>
                                    {storyData.map((element, idx)=>(
                                        <ul>
                                            <li 
                                                className="storyTitlesList"
                                                onClick={(e) => {
                                                let storyId = element.story_id
                                                console.log("wholeStory: ", wholeStory)
                                                postToMyStoryTitlesList(storyId) 
                                                }}>
                                                    {element.title}
                                            </li>
                                        </ul>
                                    ))}
                                </Typography>  
                            )} 
                        </Paper>
                    </div>
                    <div className = "paperBox">
                        <Typography variant="h2">
                            My Stories
                        </Typography>
                        <Paper elevation={2} className="titlePaper" style={{marginLeft: "20px"}}>
                            <div className="clickToAdd">
                                <Typography variant="h4">Click Story To Read</Typography>
                            </div>
                                {myStoryTitles && (
                                    <Typography variant="h3" component="div" sx={{ paddingBottom: 5 }}>
                                        {myStoryTitles.map((element, idx)=>(
                                            <ul>
                                                <li className="storyTitlesList">
                                                    <Grid container spacing={3 }style={{ display: "flex", justifyContent: "space-between"}}>
                                                        <Grid item style={{display: "flex"}}>
                                                            <Link style={{border: "solid 1px red"}}
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
                                                            <Typography variant="h4" style={{alignSelf: "center", paddingLeft: "10px"}}>
                                                                Date
                                                            </Typography>
                                                        </Grid>
                                    
                                                        <Grid  item sx={{ color: 'text.primary', border: "solid 1px green"}}>
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
                                    </Typography>
                                )}
                        </Paper>
                    </div>
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
        </main>
        </ThemeProvider>
    );
}



// export default UserStories




//----------old stuff ---------

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

    //create styles for this component
// const useStyles = makeStyles({
//     formContainer: {
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         },
//     foaasResponse: {
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "flex-end",
//     },
//     textField: {
//         width: "100%",
//     },
//     spacer: {
//         height: 15,
//     },
// });

//create variable name to access styles
    // const classes = useStyles();

     //     //Why is this main acting like it's inside the first div?
    //    
    //         <div style={{ width: '100%', display: "flex", backgroundColor:"lightblue", justifyContent: "center", paddingTop: "50px"}}>
    //             <div sx={{ backgroundColor: "green", width: "600px"}}>
    //                 <Box sx={{ width: 500, margin: '0 auto 16px', backgrounColor:"blue" }}>
    //                     <Grid container justifyContent="center">
    //                         <Typography>
    //                             All Stories
    //                         </Typography>
    //                     </Grid>
    //                 </Box>
    //                 <Box sx={{ height: 400, bgcolor: 'background.paper' }}>
    //                     What if I put something else in this box?
    //                     {/* <DataGridPro
    //                     apiRef={apiRef}
    //                     // onCellClick={handleCellClick}
    //                     hideFooter
    //                     {...data}
    //                     /> */}
    //                 </Box>
    //             </div>
    //             <div>
    //                 <Box sx={{ width: 300, margin: '0 auto 16px' }}>
    //                     <Grid container justifyContent="center">
    //                         <Typography>
    //                             My Stories
    //                         </Typography>
                        
    //                     </Grid>
    //                 </Box>
    //                 <Box sx={{ height: 400, bgcolor: 'background.paper' }}>
    //                     <DataGridPro
    //                     apiRef={apiRef}
    //                     // onCellClick={handleCellClick}
    //                     hideFooter
    //                     {...data}
    //                     />
    //                 </Box>
    //             </div>
    //         </div>

    {/* <Grid item>
            <Button onClick={handleClick('top')}>top</Button>
          </Grid>
        </Grid>
        <Grid container textAlign="center">
          <Grid item xs={4}>
            <Button onClick={handleClick('left')}>left</Button>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              color="primary"
              aria-label="home"
              onClick={handleClick('home')}
            >
              <HomeIcon /> 
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <Button onClick={handleClick('right')}>right</Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
            <Button onClick={handleClick('bottom')}>bottom</Button>
          </Grid> */}
          // const apiRef = useGridApiRef();

    // // const [coordinates, setCoordinates] = React.useState({
    // //   rowIndex: 0,
    // //   colIndex: 0,
    // // });
  
    // const { data } = useDemoData({
    //   dataSet: 'Commodity',
    //   rowLength: 100,
    // });
  
    // // React.useEffect(() => {
    // //   const { rowIndex, colIndex } = coordinates;
    // // //   apiRef.current.scrollToIndexes(coordinates);
    // //   const id = gridVisibleSortedRowIdsSelector(apiRef.current.state)[rowIndex];
    // //   const column = visibleGridColumnsSelector(apiRef.current.state)[colIndex];
    // // //   apiRef.current.setCellFocus(id, column.field);
    // // }, [apiRef, coordinates]);
  
    // // const handleClick = (position) => () => {
    // //   const maxRowIndex = gridVisibleRowCountSelector(apiRef.current.state) - 1;
    // //   const maxColIndex = visibleGridColumnsLengthSelector(apiRef.current.state) - 1;
  
    // //   setCoordinates((coords) => {
    // //     switch (position) {
    // //       case 'top':
    // //         return { ...coords, rowIndex: Math.max(0, coords.rowIndex - 1) };
    // //       case 'bottom':
    // //         return { ...coords, rowIndex: Math.min(maxRowIndex, coords.rowIndex + 1) };
    // //       case 'left':
    // //         return { ...coords, colIndex: Math.max(0, coords.colIndex - 1) };
    // //       case 'right':
    // //         return { ...coords, colIndex: Math.min(maxColIndex, coords.colIndex + 1) };
    // //       default:
    // //         return { ...coords, rowIndex: 0, colIndex: 0 };
    // //     }
    // //   });
    // // };
  
    // // const handleCellClick = (params) => {
    // //   const rowIndex = gridVisibleSortedRowIdsSelector(apiRef.current.state).findIndex(
    // //     (id) => id === params.id,
    // //   );
  
    // //   const colIndex = visibleGridColumnsSelector(apiRef.current.state).findIndex(
    // //     (column) => column.field === params.field,
    // //   );
  
    // //   setCoordinates({ rowIndex, colIndex });
    // // };

    //this was in the original box (that the paper is stored in)
