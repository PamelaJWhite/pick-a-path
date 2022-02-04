import React, { useContext } from 'react'


// //Import components that are rendered from Home page
import Login from "./Login";
import UserStories from "./UserStories";


//Import Context
import { Context } from "../context/Context";


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

