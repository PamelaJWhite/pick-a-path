import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";


//Import Context
import { Context } from "../context/Context";

import Login from "./Login";

const SignUp = () => {
    //create variable name to access styles
    

    //destructure context for only the states and functions needed
    const {
        isSignedIn,
        userName,
        setUserName,
        password,
        setPassword,
        handleLogIn,
        confirmPassword,
        setConfirmPassword,
        handleSignup,
        justSignedUp
    } = useContext(Context);

    return (
        <div>
            <form 
                style={{ display: "flex", justifyContent: "center"}}
            >
                <Paper
                    className="signup"
                >
                    <TextField
                        className="textField"
                        id="newu=UserName_field"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        variant="outlined"
                        placeholder="User Name"
                    />
    
                    <TextField
                        className="textField"
                        id="newPassword_field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        placeholder="Password"
                        type="password"
                    />
                    <TextField
                        className="textField"
                        id="confirmPassword_field"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        variant="outlined"
                        placeholder="Confirm Password"
                        type="password"
                    />
            
                    <Button 
                        variant="contained" 
                        onClick={(e)=> handleSignup()}
                    >
                        Sign Up
                    </Button>
                </Paper>
            </form> 
        </div>
    );
};

export default SignUp