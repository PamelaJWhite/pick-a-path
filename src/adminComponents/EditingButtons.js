import React, { useContext, useState}  from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import { Context } from '../context/Context'
import  StorySection  from './StorySection'

const EditingButtonsTitle = () => {
  const {
    setIsSignedIn, 
    editTitle,
    isEditing,
    setIsEditing,
    isEditingStorySection

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
          {<StorySection/>}
          }
        }
      >
        {isEditingStorySection? 
        <Typography
        className="editingButtonsText"
        >
        Add Story Section
        </Typography>
        : <Typography
        className="editingButtonsText"
        >
        Add Option
        </Typography>
        }
        
      </Button>
    </Box>
  )
  
}

const EditingButtonsSection = () => {
  const {
    setIsSignedIn, 
    editTitle,
    isEditing,
    setIsEditing,
    isEditingStorySection

  } = useContext(Context);

  const [isChangingSection, setIsChangingSection] =useState(false)

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
          // setIsEditing(!isEditing)
          setIsChangingSection(!isChangingSection)
          }
        }
      >
          {isChangingSection ?
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
        {/* {isEditingStorySection? 
        <Typography
        className="editingButtonsText"
        >
        Add Story Section
        </Typography> */}
        {/* : */}
         <Typography
        className="editingButtonsText"
        >
        Add Option
        </Typography>
        {/* } */}
        
      </Button>
    </Box>
  )
  
}

const EditingButtonsOption = () => {
  const {
    setIsSignedIn, 
    editTitle,
    isEditing,
    setIsEditing,
    isEditingStorySection

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
        {isEditingStorySection? 
        <Typography
        className="editingButtonsText"
        >
        Add Story Section
        </Typography>
        : <Typography
        className="editingButtonsText"
        >
        Add Option
        </Typography>
        }
        
      </Button>
    </Box>
  )
  
}

export {EditingButtonsTitle, EditingButtonsSection, EditingButtonsOption}