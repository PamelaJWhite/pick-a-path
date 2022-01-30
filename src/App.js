import React, { useEffect, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Navigation from './components/Navigation'
import Router from './Router'
import { Provider } from './context/Context'
// import { Context } from "./context/Context";


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
      fontFamily: "Poppins",
      // color: "#fb6107"
  },
  palette: {
      primary: {
        //light yellow
          main: '#F8D430',

          //dark blue
          contrastText: '#26349C'
        },
      secondary: {
        //light greeen
          main: '#F59F50',
          //dark red
          contrastText: '#076364'
        // dark: will be calculated from palette.secondary.main,
      },
  },
});



function App() {
//   const {
//     userName
// } = useContext(Context);
//   useEffect(() => {
//     // Update the document title using the browser API
//     console.log("will useEffect work?")
//     // console.log("userName", userName)
//   }, [userName]);
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
