import React, { useContext } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

import { Context } from "../context/Context";

//very similar to login component
const SignUp = () => {
  //destructure context for only the states and functions needed
  const {
      userName,
      setUserName,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      handleSignup
  } = useContext(Context);

  return (
    <div>
      <form 
        style={{ display: "flex", justifyContent: "center"}}
      >
        <Paper
          className="signup"
        > 
          {/* three fields for user name, password, and confirm password */}
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
          {/* button calls handleSignup in context file */}
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