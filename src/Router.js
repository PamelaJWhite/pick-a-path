import React from 'react'
import { Routes, Route, Navigate } from 'react-router'


import Home from './components/Home'
//is this needed?
import Login from './components/Login'
import UserStories from './components/UserStories'
import SignUp from './components/SignUp'
import ReadingPage from './components/ReadingPage'
import WholeStory from './components/WholeStory'

import { createTheme, ThemeProvider } from '@mui/material/styles';


import { Context } from "./context/Context";

// const ProtectedRoute = ({children}) => {
//     const {
//         checkAuth
//     } = useContext(Context);
//     // set the function equal to variable setAuth
//     //b/c can't use the function in the first part of the ternary operator in the return statement
//     const auth = checkAuth() 
//     console.log("checkAuth() in ProtecedRoute: ", checkAuth())
//     console.log("auth in ProtectedRoute: ", auth)
    
//     return   (auth === true) ? children : <Navigate to="/"/>
// }
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
        fontFamily: "Poppins"
    },
    palette: {
        primary: {
          // light: will be calculated from palette.primary.main,
            main: '#577590',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
          // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
    },
});

const Router = () => {
    return (
        <ThemeProvider theme={theme}> 
        <Routes>
            <Route path='/' element={<Home/>}/>
            {/* Home actually is the login page, so I'm not sure I need a /login path */}
            <Route path='/login' element={<Login/>}/>
            {/* userStories will be the individual user's homepage once logging in */}
            <Route path='/userStories' element={<UserStories/>}/>
            {/* signUp allows new user to create account, and later login  */}
            <Route path='/signUp' element={<SignUp/>}/>
            {/* readingPage will be any reading page, I hope
            I think there will need to be a parameter or two in it */}
            <Route path='/readingPage' element={<ReadingPage/>}/>
            {/* page to see a whole story
            maybe eventually a whole "I've learned" page */}
            <Route path='/wholeStory' element={<WholeStory/>}/>
        </Routes>
        </ThemeProvider>
    )
}
export default Router