import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Navigation from './components/Navigation'
import Router from './Router'
import { Provider } from './context/Context'

import './App.css';



function App() {
  return (
    
    <Provider>
      <BrowserRouter>
        <Navigation/>
        <Router/> 
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
