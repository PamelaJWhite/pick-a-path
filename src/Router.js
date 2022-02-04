import React from 'react'
import { Routes, Route} from 'react-router'


import Home from './userComponents/Home'
import Login from './userComponents/Login'
import UserStories from './userComponents/UserStories'
import SignUp from './userComponents/SignUp'
import ReadingPage from './userComponents/ReadingPage'
import WholeStory from './userComponents/WholeStory'

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
            {/* readingPage will be any reading page, I hope
            I think there will need to be a parameter or two in it */}
            <Route path='/readingPage' element={<ReadingPage/>}/>
            {/* page to see a whole story
            maybe eventually a whole "I've learned" page */}
            <Route path='/wholeStory' element={<WholeStory/>}/>
        </Routes>
        // </ThemeProvider>
    )
}
export default Router