import React, { useContext} from "react";
import { Link } from 'react-router-dom'

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import { Context } from "../context/Context";

//login screen component
const Login = () => {
  //destructure context for only the states and functions needed
  const {
      isSignedIn,
      userName,
      setUserName,
      password,
      setPassword,
      handleLogIn
  } = useContext(Context);

  return (
    <form 
      style={{ display: "flex", justifyContent: "center"}}
    >
      {/* Dynamicaly render login component if not signed in*/}
      {!isSignedIn && (
        
        <Paper className="login">
          {/*username field */}
          <TextField
            className="textField"
            id="userName_field"
            //set the value of userName to whatever is being tped
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            variant="outlined"
            placeholder="User Name"
          />
          {/* password field */}
          <TextField
              className="textField"
              id="password_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              placeholder="Password"
              type="password"
          />
          {/* button to login, calls handleLogIn() onclick */}
          <Button 
            variant="contained" 
            onClick={(e) => handleLogIn(e)}
          >
            Log In
          </Button>
          {/*link to signup route */}
          <Link 
            className="signUpButton"
            to={`/signUp`}>
              Sign Up!
          </Link>
        </Paper> 
      )} 
    </form>
  );
};

export default Login
