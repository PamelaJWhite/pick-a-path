//Import React and hooks needed for context
import React, { createContext, useState, useEffect } from "react";


//Import axios for api call
import axios from "axios";

//Create context
export const Context = createContext();

//Create Provider for context
//Provider will contain and export all needed states and functions
//It can be writen like a component including useEffect hooks
//{ children } are props that come from any components that are wrapped with the provider
//The provider is imported and used in App.js to wrap the whole application
//This can also be localized if needed and only wrap specific components
export const Provider = ({ children }) => {
    
    //Various states that are being exported
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
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


    //variable for MY base api url
    const url = "https://pjw1.herokuapp.com"

    let userId = "15"
    let storyId;
    //----------------------LOG IN AND OUT-----------------

    //Function to handle when user clicks login button
    //User name and Password only needs to be present to pass log in
    const handleLogIn = (e) => {
        e.preventDefault()
        //make request to backend /login
        //to get current user
        // fetch("https://pjw1.herokuapp.com/login")
        // console.log("username and password in handleLogin: ", userName, password)
            if (userName && password) {
            window.location.assign(`/userStories`)
            setIsSignedIn(true);
            } else {
            alert("Please enter any username and password");
            }
    };

    const checkAuth = () => {
        // const cookies = cookie.parse(document.cookie)
        // console.log("cookies in checkAuth: ", cookies)
        // return cookies.loggedIn === 'true' ? true : false
        return isSignedIn === "true" ? true: false
    }

    //Function to handle Log Out reset states
    const handleLogOut = () => {
        setIsSignedIn(false);
        setUserName("");
        setPassword("");
        setStoryData(null);
        window.location.assign('/')

    };

    //------------------ ACCESS STORIES -----------------

    //get all story titles from DB
    const getAllStoryTitles = async () => {

        await axios.get(url + `/stories/read`).
        then((res)=> {
            //set state for story data - which is titles, only
            //!!change this variable name? it's misleading
            setStoryData(res.data);
        })
    }

    //get story titles associated with specific user
    const getMyStoryTitles = async () => {

        await axios.get(url + `/myStories/list/${userId}`).
        then((res)=> {
            //set state for this user's story titles
            setMyStoryTitles(res.data);
        })
    }

    //post a selected title to the DB for that user
    const postToMyStoryTitlesList = async (storyId) => {
        await axios.post(url + `/stories/${storyId}/myStories/${userId}`, ).
        then((res)=> {
            //retrieve titles again so this title
            //displays on the list
            getMyStoryTitles()
        })
    }
    
    //delete a title from the user's list of titles from the DB
    //!! I'd like to change the backend to delete everything
    //b/c right now there's a bunch of completed/ partially completed stories
    //in the DB
    //Would do this by user_story_id; delete from userStory table
    const deleteTitle = async (userStoryId) => {
        await axios.delete(url + `/myStories/delete/${userStoryId}`).
        then((res)=> {
            //retrieve titles again so this title
            //displays on the list
            getMyStoryTitles()
        })
    }

    const gateKeeper = async (userStoryId) =>{
        await axios.get(url + `/myStories/completeStory/${userStoryId}`).
        then((res) => {
            console.log("gateKeeper res.data: ", res.data)
            if(res.data.length == 0){
                console.log("there's no data")
                readFirstStorySection(userStoryId)
            }else if(res.data.length== 1){
                console.log("there's one row of data")
                // console.log("res.data[0]story_section_content: ", res.data[0].story_section_content)
                setStorySection(res.data[0].story_section_content)
                console.log("storySection: ", storySection)
                console.log('res.data[0].story_section_id', res.data[0].story_section_id)
                setStorySectionId(res.data[0].story_section_id)
                // console.log("storySectionId: ", storySectionId)
            }else {
                
                //get the last row of data
                let storyRowsArray = res.data
                console.log("storyRowsArray[storyRowsArray.length-1]", storyRowsArray[storyRowsArray.length-1])
                let currentStoryRow = storyRowsArray[storyRowsArray.length-1]
                setStorySection(currentStoryRow.story_section_content)
                setStorySectionId(currentStoryRow.story_section_id)
            }
        })
    }

    //grab the first story section connected to the title from the DB
    const readFirstStorySection = async (userStoryId)=> {
        await axios.post(url + `/myStories/readFirst/${userStoryId}`).
        then((res) => {
            //set the state for storySection and storySectionId
            //to display them
            console.log("Got to readFirstStorySection")
            setStorySection(res.data.story_section_content)
            setStorySectionId(res.data.story_section_id)
        })

    }

    //grab the options related to the a story section
    const seeOptions = async () => {
        await axios.post(url + `/myStories/options/${storySectionId}`).
        then((res) => {
            //map over the data
            //to create an array of options
            //the option text, option id, and resulting story section id
            //are included in this element
            let optionArray = []
            res.data.map((element, index)=> {
                optionArray.push(element)
            })
            //set the array of option content text to Options
            //so we can view them later
            setOptions(optionArray)
            console.log("optionArray: ", optionArray)
            setChoicesTime("true") 
            })
    } 
    
    //save an option to the DB
    //storySectionId and optionId will be saved to the DB
    //userStoryId and resultingStorySection will be used to read the next section
    //!! Do these need to be parameters? Aren't they held in state so they can be accessed directly?
    const saveOption = async (userStoryId, storySectionId, optionId, resultingStorySectionId)=>  {
        await axios.post(url + `/myStories/options/${userStoryId}/${storySectionId}/${optionId}`).
        then((res) => {
            //call function to read the next section
            readNextSection(userStoryId, resultingStorySectionId)
        })
    }

    //similar to read first section
    //reads subsequent session based on 
    //resultingStorySectionId
    //!!Again, do I even need to pass userStoryId and resultingStorySectionId?
    //or should those have been/ are they saved in state?
    const readNextSection =  async (userStoryId, resultingStorySection)=> {
        await axios.post(url + `/myStories/readNext/${userStoryId}/${resultingStorySectionId}`).
        then((res) => {
            //reset the storySection and StorySectionId in state
            console.log(res.data)
            setStorySection(res.data.story_section_content)
            setStorySectionId(res.data.story_section_id)
        }).then(()=> {
            //Call function to see options
            console.log("storySectionId in readNextSectino(): ", storySectionId)
            // seeOptions(storySectionId)
        })
    }

    //gather all the data from the DB for a specific instance of the story
    //i.e., based on the userStoryId
    const readCompleteStory = async (userStoryId) =>{
        await axios.get(url + `/myStories/completeStory/${userStoryId}`).
        then((res) => {
            console.log("completeStory res.data: ", res.data)
            //map over the data
            //creates an element with the story section content and option content
            //and adds that to the completeStory array
            let completeStory = []
            res.data.map((element, index)=> {
                completeStory.push(element.story_section_content)
                completeStory.push(element.option_content)
                
                //completeStory array is saved to state
                //to be accessed elsewhere
            })
            setWholeStory(completeStory)
        })
    }
    const resetStoryState = () => {
        console.log("resetStoryState was called")
        // setWholeStory([])
        // setStorySectionId("")
        // setUserStoryId('')
        // setStorySection("")
        setOptions('')
        setOptionId('')
        setChoicesTime(false)
    }

    //List of exported states and functions
    //These only need to be export if they are used on other components
    const value = {
        isSignedIn,
        setIsSignedIn,
        userName,
        setUserName,
        password,
        setPassword,
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
        checkAuth
    };

    //Return statement that will wrap any child elements with the exported context states and functions
    return <Context.Provider value={value}>{children}</Context.Provider>;
    };


    //---Attempt to start where you left off---
    //this code was in readCompleteStory()
    //the problem is if you start a story, don't make any choices, and then hit home, it won't work on restart
    //this DID work for when you had made a few choices, at least at one time
    //if instead of "readFirstStorySEction", that button directed to "readCompleteStory"
      // if (completeStory.length === 0){
            //     console.log("completeStory.length is: ", completeStory.length)
            //     readFirstStorySection(userStoryId)
            // }
            // else{
            //     //grab the last element in the res.data optionArray
            //     //it will be the most recent story section, et al.
            //     console.log("completeStory.length is: ", completeStory.length)
            //     let last = res.data.pop(-1)
            //     console.log("last: ", last)
            //     console.log("last.story_section_id:", last.story_section_id)
            //     //let's try just going to the next story section
            //     //nope, I'm going to have to set both of those, I think
            //     console.log("userStoryId: ", userStoryId)
            //     //set resulting story section id 
            //     //to the last story section id of the res.data array
            //     //to use in readNextSection()
            //     setStorySectionId(last.story_section_id)
            //     setResultingStorySectionId(last.story_section_id)
            //     readNextSection()
            // }




            
    //Function to set appropriate states to collect inputs for different api endpoints
    // const handleRandomNumber = () => {
    //     switch (randomNumber) {
    //     case 1:
    //         setNeedsFrom(true);
    //         break;
    //     case 2:
    //         setNeedsName(true);
    //         setNeedsFrom(true);
    //         break;
    //     case 3:
    //         setNeedsFrom(true);
    //         setNeedsThing(true);
    //         break;
    //     case 4:
    //         setNeedsFrom(true);
    //         break;
    //     default:
    //         break;
    //     }
    // };

    //Function to complete api url and pass GET request through Axios
    // const handleFOAAS = async () => {
    //     let urlParams;
    //     switch (randomNumber) {
    //     case 1:
    //         urlParams = `cup/${from}`;
    //         break;
    //     case 2:
    //         urlParams = `rockstar/${name}/${from}`;
    //         break;
    //     case 3:
    //         urlParams = `particular/${thing}/${from}`;
    //         break;
    //     case 4:
    //         urlParams = `sake/${from}`;
    //         break;
    //     default:
    //         urlParams = `awesome/Nick`;
    //         break;
    //     }

    // if (urlParams) {
    //     await axios.get(baseUrl + urlParams).then((response) => {
    //         // console.log(response.data);
    //         //Sets state with data the comes back from api call
    //         setFoaas(response.data);
    //     });
    //     }
    // };

    //useEffect hook to change input states when the randomNumber state changes
    // useEffect(() => {
    //     if (randomNumber) {
    //     handleRandomNumber();
    //     }
    // }, [randomNumber]);

    // const [randomNumber, setRandomNumber] = useState(null);
    // const [needsName, setNeedsName] = useState(false);
    // const [needsFrom, setNeedsFrom] = useState(false);
    // const [needsThing, setNeedsThing] = useState(false);

// const [name, setName] = useState("");
    // const [from, setFrom] = useState("");
    // const [thing, setThing] = useState("");
    // const [foaas, setFoaas] = useState(null);


    // setRandomNumber(null);
        // setName("");
        // setThing("");
        // setFrom("");
        // setNeedsThing(false);
        // setNeedsName(false);
        // setNeedsFrom(false);

        // needsName,
        // setNeedsName,
        // needsFrom,
        // setNeedsFrom,
        // needsThing,
        // setNeedsThing,
        // name,
        // setName,
        // from,
        // setFrom,
        // thing,
        // setThing,
        // foaas,
        // setFoaas,
        // handleFOAAS,
        // setRandomNumber,


    //variable for api url
    // const baseUrl = "https://www.foaas.com/awesome/Nick";

   //url for all story titles
    // const url = "https://pjw1.herokuapp.com/stories/read"
