import React from 'react'
import { Routes, Route, Navigate } from 'react-router'


import Home from './components/Home'
import Login from './components/Login'


const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    )
}
export default Router