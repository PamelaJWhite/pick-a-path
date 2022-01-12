import React from 'react'
import { Routes, Route, Navigate } from 'react-router'


import Home from './components/Home'
//is this needed?
import Login from './components/Login'
import UserStories from './components/UserStories'
import SignUp from './components/SignUp'

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


const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            {/* Home actually is the login page, so I'm not sure I need a /login path */}
            <Route path='/login' element={<Login/>}/>
            {/* userStories will be the individual user's homepage once logging in */}
            <Route path='/userStories' element={<UserStories/>}/>
            {/* signUp allows new user to create account, and later login  */}
            <Route path='/signUp' element={<SignUp/>}/>
        </Routes>
    )
}
export default Router