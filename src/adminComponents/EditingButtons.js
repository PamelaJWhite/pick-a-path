import React, { useContext}  from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import { Context } from '../context/Context'

const EditingButtons = () => {
  const {
    setIsSignedIn, 
    editTitle,
    isEditing,
    setIsEditing

  } = useContext(Context);

  return(
    <Box
      sx={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}
    >
      <Button
        className="editingButtons"
        sx={{margin:"2px"}}
        variant="contained" 
        onClick={(e) => {
          console.log("clicked save/ edit button")
          setIsEditing(!isEditing)
          }
        }
      >
          {isEditing ?
            <Box>
              Save
            </Box>
            :<Box>
              Edit
            </Box> 
          }
      </Button>
      <Button
        variant="contained" 
        sx={{margin:"2px"}}
        onClick={(e) => {
          console.log("clicked Add Story Section button")
          //!!going to be func to open story section editing box
          }
        }
      >
        Add Story Section
      </Button>
    </Box>
  )
  
}

export default EditingButtons