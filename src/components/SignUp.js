import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";

//Import Context
import { Context } from "../context/Context";

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

const SignUp = () => {
    //create variable name to access styles
    const classes = useStyles();

    //destructure context for only the states and functions needed
    const {
        isSignedIn,
        userName,
        setUserName,
        password,
        setPassword,
        handleLogIn,
    } = useContext(Context);

    return (
        <div>

            <form className={classes.login}>
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
                // onClick={() => handleLogIn()}
                onClick={console.log("I wanna sign up!")}
            >
                Sign Up
            </Button>
            </form> 
        </div>
    );
};

export default SignUp