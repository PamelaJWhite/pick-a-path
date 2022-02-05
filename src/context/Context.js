//Import React and hooks needed for context
import React, { createContext, useState} from "react";

//Import axios for api call
import axios from "axios";

//Create context
export const Context = createContext();

//Create Provider for context
//Provider contains and exports all needed states and functions
export const Provider = ({ children }) => {
    
  //Various states that are being exported
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState ('')
  const [userId, setUserId] = useState('')
  const [storyData,setStoryData] =useState("");
  const [myStoryTitles, setMyStoryTitles] = useState("")
  const [userStoryId, setUserStoryId] = useState("")
  const [storySection, setStorySection] = useState("")
  const [choicesTime, setChoicesTime] =useState(false)
  const [storySectionId, setStorySectionId] = useState("")
  const [options, setOptions] = useState([])
  const [optionId, setOptionId] = useState("");
  const [resultingStorySectionId, setResultingStorySectionId] = useState("")
  const [wholeStory, setWholeStory] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [date, setDate] = useState('')
  const [end, setEnd] = useState(false)
  const [token, setToken] = useState('')
  const [isTitle, setIsTitle] = useState('')
  //editing-specific context
  const [editTitle, setEditTitle] = useState("Title")
  const [isEditing, setIsEditing] = useState (false)
  const [editStorySection, setEditStorySection] = useState ("StorySection")
  const [editOption, setEditOption] = useState ("Option")

  //variable for my base api url
  const url = "https://pjw1.herokuapp.com"
  
  // ------------- SIGNUP ----------
  const handleSignup = () => {
    //axios post call to create a new user
    axios.post(url + `/createUser`, {
      //send username, password, confirmPassword, email, and role
      //until  admin side is set up, role and email are fixed
      username: userName,
      password: password,
      confirmPassword: confirmPassword,
      email: "generic@fakemail.com",
      role: "user",
    })
    .then((res)=> {
      //go back to home route
      window.location.assign('/')
    })
  }
  
  //----------------------LOG IN AND OUT-----------------

  //function to log in
  const handleLogIn = () => {
    //axios post call including user name and password
    //to be checked by backend and return token
    axios.post(url + `/login`, {
      username: userName,
      password: password
    })
    .then((res)=> {
      //set isSignedIn to true so components rendered on login will render
      setIsSignedIn(true)
      //set token so other axios calls can use it to access data
      setToken(res.data.accessToken)
      // set userId so correct data are gathered in axios calls
      setUserId(res.data.userId)
    })
  }

    //Function to handle Log Out reset states
  const handleLogOut = () => {
    //reset all state and go to home route
    window.location.assign('/')
  };


  //------------------ ACCESS STORIES -----------------

  //get all story titles from DB
  const getAllStoryTitles = () => {
    //axios get call for all titles, including token in header for authorization
    axios.get(url + `/stories/read`, {headers:{authorization: token}})
    .then((res)=> {
        //set state for story data - which is titles, date
        setStoryData(res.data);
    })
  }

    //get story titles associated with specific user
  const getMyStoryTitles = () => {
    //axios get call for user's stories, sending token in header for authorization
    axios.get(url + `/myStories/list/${userId}`, {headers:{authorization: token}})
    .then((res)=> {
      //set state for this user's story titles
      setMyStoryTitles(res.data);
    })
  }

  //post a selected title to the DB for that user
  const postToMyStoryTitlesList = (storyId) => {
  //axios post call, longhand, including header and body data
  axios({
    method: 'POST',
    url: `https://pjw1.herokuapp.com/stories/${storyId}/myStories/${userId}`,
    data: {
        start_date: date
    },
    headers: {"Authorization": token}
    })
    .then((res)=> {
      //retrieve titles again so this title
      //displays on the list
      getMyStoryTitles()
    })
  }
    
  //delete a title from the user's list of titles from the DB
  const deleteTitle = (userStoryId) => {
    //axios delete call, with token in header for authorization
    axios.delete(url + `/myStories/delete/${userStoryId}`, {headers:{authorization: token}})
    .then((res)=> {
      //retrieve titles again so this title
      //display the list without removed title
      getMyStoryTitles()
    })
  }

  //function to identify where the user is 
  //in this particular iteration of the story, via userStoryId
  //so user can start where they left off
  //really, it's more of a bookmark than a gatekeeper and now I wish I had labeled it that
  const gateKeeper = (userStoryId) =>{
    //axios call to get the completeStory data
    axios.get(url + `/myStories/completeStory/${userStoryId}`, {headers:{authorization: token}})
    .then((res) => {
      //if there is no complete story with that userStoryId yet
      if(res.data.length === 0){
        //readFirstStorySection()
        readFirstStorySection(userStoryId)
      //if more than one row has been stored, then the first choice has already been made
      //and thus the first section and choice have been stored
      }else {
        //store all data in variable storyRowsArray
        let storyRowsArray = res.data
        //set the title from the first row 
        setIsTitle(storyRowsArray[0].title)
        //store the current row
        let currentStoryRow = storyRowsArray[storyRowsArray.length-1]
        //set the storySection so it can be read
        setStorySection(currentStoryRow.story_section_content)
        //set the storySectionId so options can be found
        setStorySectionId(currentStoryRow.story_section_id)
      }
    })
  }

  //grab the first story section connected to the title from the DB
  const readFirstStorySection = (userStoryId)=> {
    //axios post call to read first section; headers with token for authorization
    axios.post(url + `/myStories/readFirst/${userStoryId}`, {}, {headers:{authorization: token}})
    .then((res) => {
      //set the title here
      setIsTitle(res.data.title)
      //set the state for storySection to be displayed
      setStorySection(res.data.story_section_content)
      //set the storySectionId to be used to get options
      setStorySectionId(res.data.story_section_id)
    })
  }

  //grab the options related to a story section
  const seeOptions = () => {
    //axios post call;  nothing is posted in this call
    axios.post(url + `/myStories/options/${storySectionId}`, {}, {headers:{authorization: token}})
    .then((res) => {
      //map over the data
      //to create an array of options
      //the option text, option id, and resulting story section id
      //are included in this element
      let optionArray = []
      res.data.map((element, index)=> {
          optionArray.push(element)
      })
      //if there are no options, it is the end of the story
      if(optionArray.length == 0){
          //set end to true to render See My Story button
          setEnd(true)
      }else{
        //set the array of option content text to Options state
        //so we can view them later
        setOptions(optionArray)
        //set choicesTime to true so choices will render
        setChoicesTime("true") 
      }
    })
  } 
    
  //storySectionId and optionId will be saved to the DB
  const saveOption = ()=>  {
      //axios call to post section and option ids
      axios.post(url + `/myStories/options/${userStoryId}/${storySectionId}/${optionId}`, {}, {headers:{authorization: token}})
      .then((res) => {
        //call function to read the next section
        readNextSection(userStoryId, resultingStorySectionId)
      })
  }

  //similar to read first section
  //reads subsequent session based on resultingStorySectionId
  const readNextSection =  ()=> {
    //axios post call, gets next section and adds it to DB for this iteration of the story
    axios.post(url + `/myStories/readNext/${userStoryId}/${resultingStorySectionId}`, {}, {headers:{authorization: token}})
    .then((res) => {
      //reset the storySection and StorySectionId in state
      setStorySection(res.data.story_section_content)
      setStorySectionId(res.data.story_section_id)
    })
  }

  //gather all the data from the DB for a specific instance of the story
  //i.e., based on the userStoryId
  const readCompleteStory = (userStoryId) =>{
    axios.get(url + `/myStories/completeStory/${userStoryId}`, {headers:{authorization: token}})
    .then((res) => {
      // variable to hold array of story sections and chosen options
      let completeStory = []
      //map over the data from the call
      res.data.map((element, index)=> {
        // add the story sections and options to the completeStory array
        completeStory.push(element.story_section_content)
        completeStory.push(element.option_content)
      })
      //completeStory array is saved to state
      //to be accessed elsewhere
      setWholeStory(completeStory)
    })
  }

//-------------------  Misc -------------------------
  //reset the pieces of state that will allow a user to 
  //go to their story home at any point
  //and start a new story or open a previous story
  const resetStoryState = () => {
    setOptions('')
    setOptionId('')
    setChoicesTime(false)
    setEnd(false)
  }

  // when called, makes a date
  const createDate = () => {
    //varaible to create the new date
    let showDate = new Date();
    //variable to hold pieces of the date that we want to display
    let displayDate = (showDate.getMonth()+1)+'/'+showDate.getDate()+'/'+showDate.getFullYear().toString().substr(-2);
    //set state so date can be displayed
    setDate(displayDate)
  }

  //List of exported states and functions
  const value = {
      isSignedIn,
      setIsSignedIn,
      userName,
      setUserName,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      handleSignup,
      handleLogIn,
      getAllStoryTitles,
      storyData,
      setStoryData,
      getMyStoryTitles,
      myStoryTitles,
      postToMyStoryTitlesList,
      deleteTitle,
      userStoryId,
      setUserStoryId,
      readFirstStorySection,
      readNextSection,
      storySection, 
      setStorySection,
      choicesTime, 
      setChoicesTime,
      storySectionId,
      seeOptions,
      options,
      optionId, 
      setOptionId,
      resultingStorySectionId, 
      setResultingStorySectionId,
      readCompleteStory,
      wholeStory,
      setWholeStory,
      handleLogOut,
      saveOption,
      resetStoryState,
      isDrawerOpen,
      setIsDrawerOpen,
      gateKeeper,
      date,
      createDate,
      end,
      token, 
      isTitle, 
      editTitle, 
      isEditing,
      setIsEditing,
      editStorySection, 
      editOption
  };

  //Return statement that will wrap any child elements with the exported context states and functions
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
