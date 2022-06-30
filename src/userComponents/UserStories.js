import React, { useContext} from "react";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

//import context
import { Context } from "../context/Context";

//prevent user from using back button
//which would mess up their story, as it saves along the way
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
window.history.go(1);
};

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
    createDate,
    gateKeeper,
    userName
  } = useContext(Context);


  getAllStoryTitles()
  getMyStoryTitles()
  console.log("how many times i this running?")

  return (
    <Box  
      component="main"
      color="primary.contrastText" 
      style={{ paddingBottom: "50px"}}
    >
      {/* User's Story Home title */}
      <Box className="title"> 
        <Box 
          style={{ margin: "15px"}}    
        >
          <Typography variant="h1">
            {/* uses login userName to display name */}
            {userName}'s Story Home
          </Typography>
        </Box>
      </Box>
      {/* Box containing two boxes with title lists */}
      <Box className = "readBox">
        {/* Left box, list of All Story Titles */}
        <Box 
          className = "paperBox"
        >
          <Typography 
            variant="h2" 
            color="secondary.contrastText"
            style={{paddingBottom: "5px"}}
          >
            All Stories
          </Typography>
          <Paper 
            elevation={9} 
            className="titlePaper"
            style={{marginRight: "20px" }}
          >
            <div className = "clickToAdd">
                <Typography 
                    variant="h4" 
                >
                    Click Story to Add
                </Typography>
            </div>
            {/* When storyData are present, display All titles */}
            {storyData && (
              <Typography 
                color="primary.contrastText"
                variant="h3" 
                component="div" 
                sx={{ paddingBottom: 5}}>
                {/* Map over the story data, which are titles of All Stories */}
                {storyData.map((element, idx)=>(
                  <List 
                    style={{padding:0}} 
                  >
                    {/* When a title is clicked, create a date for it
                    and add it to the User's stories list */}
                    <ListItem 
                        key={userStoryId} 
                        style={{padding:"10px"}}
                        className="storyTitlesList list"
                        onMouseDown={((e)=> {
                          createDate() 
                          }
                        )}
                        onClick={(e) => {
                          let storyId = element.story_id
                          postToMyStoryTitlesList(storyId)
                        }}>
                          {element.title}
                    </ListItem>
                  </List>
                ))}
              </Typography>  
            )} 
        </Paper>
      </Box>
      {/* Right box, list of User's titles */}
      <Box
        className = "paperBox"
      >
        <Typography
          variant="h2" 
          color="secondary.contrastText"
          style={{paddingBottom: "5px"}}
        >
          My Stories
        </Typography>
        <Paper 
            elevation={9} 
            className="titlePaper" 
            style={{marginLeft: "20px"}}
        >
          <Box 
            className="clickToAdd"
          >
            <Typography 
              variant="h4"
            >
              Click Story To Read
            </Typography>
          </Box> 
            {/* When myStoryTitles data are available, display them */}
            {myStoryTitles && (
              <Typography 
                color="primary.contrastText"
                variant="h3" 
                component="div" 
                sx={{ paddingBottom: 5}}
              >
                {/* Map over user's story titles */}
                {myStoryTitles.map((element, idx)=>(
                  <List
                    sx={{padding:0, display: "flex",  justifyContent:"space-between"}}
                  >
                    <ListItem 
                      style={{padding:"10px"}}
                      className="storyTitlesList list"
                      key={userStoryId}
                    >
                      <Box 
                          item 
                          className="innerGridOne"
                          component="div"
                      >
                        {/* Each list item is a link to that story's ReadingPage */}
                        <Link 
                          className="myStoriesListLinks"
                          style={{width: "218px"}}
                          onMouseDown={(e) =>{
                            setUserStoryId(element.user_story_id)
                          }}
                          // Goes through the gateKeeper() to know where to start the story
                          onClick={(e) => {
                            gateKeeper(userStoryId)
                            }}
                          to={"/readingPage"}
                        >
                          <Typography
                            color="primary.contrastText"
                            variant="h3" 
                            component="div" 
                          >
                            {element.title}
                          </Typography>
                        </Link>
                        {/* Start dates are rendered next to the titles */}
                        <Typography 
                            variant="h4" 
                            style={{alignSelf: "center", paddingLeft: "10px"}}>
                              {element.start_date}
                        </Typography>
                      </Box>
                    </ListItem>
                    {/* delete icons are rendered next to the date */}
                    <ListItem
                      style={{display: "flex", justifyContent:"flex-end"}}
                    >
                      <Box>
                        <DeleteForeverIcon 
                          className="deleteIcons"
                          onClick={(e) => {
                            let userStoryId = element.user_story_id
                            deleteTitle(userStoryId)
                          }}
                        />
                      </Box>
                    </ListItem>
                  </List>
                ))}
              </Typography>
            )}
        </Paper>
      </Box>
      </Box>
            {/* this is set up as a button
            because I think it was making hundreds of calls
            when i had the get request functions 
            run at the top of the page, bc i have this set up 
            to automatically re-render as I make changes */}
        
            <Button
                style={{ margin:"100px"}}
                color="primary"
                variant="contained"
                onClick={() => {
                    getAllStoryTitles()
                    getMyStoryTitles()
                    }
                }
            >
                click me
            </Button> 
            
    </Box>
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
