import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

// //Import components that are rendered from Home page
import Login from "./Login";
import UserStories from "./UserStories";
import Navigation from '../components/Navigation'

//Import Context
import { Context } from "../context/Context";

//import material UI components

const Home = () => {
    //destructure context for only the states and functions needed
    const { isSignedIn } = useContext(Context);
    
    return (
        <div>
            {/* Dynamically Render home page from isSignedIn state from context */}
            {/* This will need to change to something like (`/details/${listing.id}`)}>
            adding the path parameter for a specific user */}
            {!isSignedIn ? <Login /> : <UserStories />}
            {/* { <Login /> } */}


        </div>
    )
}

export default Home



// import { makeStyles } from "@mui/styles";


// //create styles for this component
// const useStyles = makeStyles({
//   appHome: {
//     width: "100%",
//     height: "90vh",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export const Home = () => {
//   //create variable name to access styles
//   const classes = useStyles();

//   return (
//     <div>
//       <NavBar />
//       
//     </div>
//   );
// };

//<div className={classes.appHome}>