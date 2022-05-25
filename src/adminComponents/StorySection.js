import React, { useContext}  from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import { Context } from '../context/Context'
import { EditingButtonsSection } from './EditingButtons'
import Options from './Options'

const StorySection = () => {
  const {
    setIsSignedIn, 
    editTitle,
    isEditing,
    editStorySection,
    setisEditingStorySection,
    isEditingStorySection

  } = useContext(Context);


  return (
    <div>
        {editStorySection.map((element, idx) => (
          <Box 
          component="main"
          color="primary.contrastText"  
        > 
          <Box 
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
      
                  {element.section}
                 
                  </Typography>
                </Box>
                // if editing, show text field
                :<TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={2}
                  defaultValue="Write your story section"
                />
                }
                {/* button box for the three editing buttons */}
                { <EditingButtonsSection /> }
              </Box>
            </Box>
          </Box>
          <Box
            sx={{display:"flex", flexWrap: "wrap", justifyContent:"center"}}
          >
            {<Options/>}
            {<Options/>}
            {<Options/>}
            {/* {<Options/>} */}
          </Box>
        </Box>
        ))}
      
  </div>
  )
}

export default StorySection