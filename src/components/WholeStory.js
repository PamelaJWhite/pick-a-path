import React, { useContext} from "react";
import {Link} from "react-router-dom";

//import MUI compoenents
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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
    
            <Box
            component="main" 
            bgcolor="primary.main"
            className="{classes.formContainer}" 
            style={{ marginBottom:"50px" }}>
                <div className="title"> 
                        <Box style={{ margin: "30px"}}>
                            <Typography variant="h1">
                                {/* !!Need to figure out how to get title! */}
                                Title Goes Here
                            </Typography>
                        </Box>
                </div>
                <Paper 
                className="readPaperWhole" 
                style={{backgroundColor:"rgb(254, 240, 184)"}}
                elevation={9}>
                    <Typography variant="h3" className="readingText">
                    {/* Cupcake ipsum dolor sit amet caramels sugar plum bonbon candy. Oat cake jelly-o bear claw apple pie powder wafer. Lollipop gingerbread fruitcake oat cake marzipan chocolate bar lemon drops powder cheesecake. Tootsie roll cookie danish candy liquorice sweet tootsie roll. Gingerbread liquorice chupa chups cotton candy sesame snaps jelly beans cookie. Chocolate topping tart carrot cake pastry cake lollipop cake tiramisu. Chocolate bar gummi bears cake apple pie candy canes. Powder chupa chups cookie gummies jelly-o gummi bears cheesecake topping. Gummies wafer chupa chups chocolate macaroon cake. Lemon drops powder macaroon jelly gingerbread bonbon dessert.Cupcake ipsum dolor sit amet caramels sugar plum bonbon candy. Oat cake jelly-o bear claw apple pie powder wafer. Lollipop gingerbread fruitcake oat cake marzipan chocolate bar lemon drops powder cheesecake. Tootsie roll cookie danish candy liquorice sweet tootsie roll. Gingerbread liquorice chupa chups cotton candy sesame snaps jelly beans cookie. Chocolate topping tart carrot cake pastry cake lollipop cake tiramisu. Chocolate bar gummi bears cake apple pie candy canes. Powder chupa chups cookie gummies jelly-o gummi bears cheesecake topping. Gummies wafer chupa chups chocolate macaroon cake. Lemon drops powder macaroon jelly gingerbread bonbon dessert.Cupcake ipsum dolor sit amet caramels sugar plum bonbon candy. Oat cake jelly-o bear claw apple pie powder wafer. Lollipop gingerbread fruitcake oat cake marzipan chocolate bar lemon drops powder cheesecake. Tootsie roll cookie danish candy liquorice sweet tootsie roll. Gingerbread liquorice chupa chups cotton candy sesame snaps jelly beans cookie. Chocolate topping tart carrot cake pastry cake lollipop cake tiramisu. Chocolate bar gummi bears cake apple pie candy canes. Powder chupa chups cookie gummies jelly-o gummi bears cheesecake topping. Gummies wafer chupa chups chocolate macaroon cake. Lemon drops powder macaroon jelly gingerbread bonbon dessert. */}
                        {wholeStory}
                    </Typography>
                </Paper>
            </Box>
        
    );
};

export default WholeStory