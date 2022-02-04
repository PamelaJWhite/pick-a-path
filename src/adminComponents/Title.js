import React, { useContext}  from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import { Context } from '../context/Context'

const Title = () => {
  //destructure context for only the states and functions needed
  const {
    setIsSignedIn, 
    editTitle,
    isEditing,
    setIsEditing

  } = useContext(Context);

  setIsSignedIn("true")

  return (
    <div>
      <Box 
        component="main"
        color="primary.contrastText"  
      > 
        <Box 
          className="title"
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          style={{ margin: "15px"}}    
        >
          {/* This box will have either Title with edit button
          or text field with save button
          both will have add story section button */}
          <Box>
            {/* if not editing, show title */}
            {!isEditing ? 
            <Box
              sx={{display:"flex"}}
            >
              <Typography variant="h1">
                {/* uses login userName to display name */}
                {editTitle}
              </Typography>
              <Button
                variant="contained" 
                onClick={(e) => {
                  console.log("clicked edit button")
                  setIsEditing(true)
                  }
                }
              >
                Edit
              </Button>
            </Box>
            // if editing, show text field
            :<TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Title"
          />
            }
          </Box>
        </Box>
      </Box>
    <h1> ANYTHING </h1>
    <button>don't press my buttons</button>
    </div>
  )
};

export default Title