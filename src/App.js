import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Navigation from './components/Navigation'
import Router from './Router'
import { Provider } from './context/Context'

import { createTheme, ThemeProvider } from '@mui/material/styles';


import './App.css';
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
          main: '#bda1a3',
        // dark: will be calculated from palette.primary.main,
          contrastText: '#ffffe1'
      },
      secondary: {
          main: '#feeda7',
          contrastText: '#5e6e7d'
        // dark: will be calculated from palette.secondary.main,
      },
  },
});



function App() {
  return (
    
    <Provider>
      <BrowserRouter>
      <ThemeProvider theme={theme}> 
        <Navigation/>
        <Router/> 
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
