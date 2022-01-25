import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom'

import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from '@mui/material/styles';


//Import Context
import { Context } from "../context/Context";

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
  });
//create styles for this component
const useStyles = makeStyles({
    login: {
        height: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    textField: {
        width: 300,
    },
    spacer: {
        height: 15,
    },
    });

    const Login = () => {
    //create variable name to access styles
    //?? do I need this? I think I can do them directly
    const classes = useStyles();

    //destructure context for only the states and functions needed
    const {
        isSignedIn,
        userName,
        setUserName,
        password,
        setPassword,
        handleLogIn,
        setIsSignedIn
    } = useContext(Context);


    return (
        <ThemeProvider theme={theme}>
            <div>
            {/* Dynamicaly render content based on isSignedIn state from context  */}
                {!isSignedIn && (
                    <div className={classes.login}>
                    <TextField
                        className={classes.textField}
                        id="userName_field"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        variant="outlined"
                        placeholder="User Name"
                    />
                    <div className={classes.spacer}></div>
                    <TextField
                        className={classes.textField}
                        id="password_field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        placeholder="Password"
                        type="password"
                    />
                    <div className={classes.spacer}></div>
                    <Button 
                        variant="contained" 
                        onClick={(e) => handleLogIn(e)}
                    >
                        Log In
                    </Button>
                    <Link to={`/signUp`}>Sign Up!</Link>
                    </div> 
                )} 
            </div>
        </ThemeProvider>
        
    );
};

export default Login
