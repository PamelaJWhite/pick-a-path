import React, { useContext}  from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import { Context } from '../context/Context'
import EditingButtons from './EditingButtons'
const Options = () => {
  const {
    setIsSignedIn, 
    editTitle,
    isEditing,
    editOption

  } = useContext(Context);


  return(
    <Box 
      // component="main"
      sx={{display: "flex", flexDirection:"center", border:"1px solid green"}}
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
        {/* This box will have either Option with edit button
        or text field with save button
        both will have add story section button */}
        <Box>
          {/* if not editing, show Option */}
          
          <Box
            sx={{display:"flex", justifyContent:"space-between", width:"450px", height: "100px", alignItems: "center"}}
          >
            {!isEditing ? 
            <Box
              sx={{ display:"flex", justifyContent:"center", alignItems:"center", width:"275px"}}
            >
              <Typography 
              variant="h4"
              >
              {/* uses login userName to display name */}
              {editOption}
              </Typography>
            </Box>
            // if editing, show text field
            :<TextField
              id="outlined-multiline-static"
              multiline
              rows={2}
              defaultValue="Write your option"
            />
            }
            {/* button box for the three editing buttons */}
            { <EditingButtons /> }
          </Box>
        </Box>
      </Box>
    </Box>
  )
  
}

export default Options