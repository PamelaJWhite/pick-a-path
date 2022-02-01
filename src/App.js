//All files follow the same organizational pattern for imports
//importing React and BrowswerRouter 
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

//importing createTheme and ThemeProvider from MUI
//to use theme throughout the app
import { createTheme, ThemeProvider } from '@mui/material/styles';

//importing local files and components
import Navigation from './components/Navigation'
import Router from './Router'
import { Provider } from './context/Context'
import './App.css';



//set styles for theme to be used throughout
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
  },
  palette: {
      primary: {
          //bright yellow
          main: '#F8D430',
          //deep blue-purple
          contrastText: '#26349C'
        },
      secondary: {
          //bright orange
          main: '#F59F50',
          //dark teal green
          //cannot actually be used as contrast text
          //because it doesn't meet accessibility standards
          //chose to re-design how these colors are used together
          //rather than changing them so significantly as to meet acceisbility standards
          contrastText: '#076364'
      },
  },
});

//Function that returns all parts of the app
function App() {

  return (
    
    <Provider>
      <BrowserRouter>
      {/* Components to be displayed are wrapped in theme */}
      <ThemeProvider theme={theme}> 
        {/* Navigation will appear everywhere it is not dynamically rendered not to */}
        <Navigation/>
        {/* all other components can be accessed by a specific route */}
        <Router/> 
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
