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
    const [optionId, setOptionId] = useState("")
    const [resultingStorySectionId, setResultingStorySectionId] = useState("")

    

    //variable for api url
    // const baseUrl = "https://www.foaas.com/awesome/Nick";

   //url for all story titles
    // const url = "https://pjw1.herokuapp.com/stories/read"

    //variable for MY base api url
    const url = "https://pjw1.herokuapp.com"

    let userId = "15"
    let storyId;

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

    const getAllStoryTitles = async () => {

        await axios.get(url + `/stories/read`).
        then((res)=> {
            // console.log("res.data in getAllStoryTitles():", res.data)
            setStoryData(res.data);
        })
    }

    const getMyStoryTitles = async () => {

        await axios.get(url + `/myStories/list/${userId}`).
        then((res)=> {
            console.log("res.data in getMyStoryTitles():", res.data)
            setMyStoryTitles(res.data);
        })
    }

    const postToMyStoryTitlesList = async (storyId) => {

        await axios.post(url + `/stories/${storyId}/myStories/${userId}`, ).
        then((res)=> {
            getMyStoryTitles()
        })
    }

    const deleteTitle = async (userStoryId) => {
        await axios.delete(url + `/myStories/delete/${userStoryId}`).
        then((res)=> {
            console.log("what's res in deleteTitle? ", res)
            getMyStoryTitles()
        })
    }

    const readFirstStorySection = async (userStoryId)=> {
        await axios.post(url + `/myStories/readFirst/${userStoryId}`).
        then((res) => {
            console.log("res.data in readFirstStorySection", res.data)
            setStorySection(res.data.story_section_content)
            setStorySectionId(res.data.story_section_id)
        })

    }

    const readNextSection = async (userStoryId, resultingStorySectionId)=> {
        await axios.post(url + `/myStories/read/${userStoryId}/${resultingStorySectionId}`).
        then((res) => {
            console.log("res.data in readNextSection(): ", res.data)
            // setStorySection(res.data.story_section_content)
            // setStorySectionId(res.data.story_section_id)
        })

    }

    const seeOptions = async (storySectionId) => {
        await axios.post(url + `/myStories/options/${storySectionId}`).
        then((res) => {
            let optionArray = []
            res.data.map((element, index)=> {
                optionArray.push(element)
                console.log("optionArray in map: ", optionArray)
            })
            //set the array of option content text to Options
            //so we can view them later
            setOptions(optionArray)
            //
        })
    }  

    // /stories/:story_id/myStories/:user_id

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
        handleLogOut,
        checkAuth
    };

    //Return statement that will wrap any child elements with the exported context states and functions
    return <Context.Provider value={value}>{children}</Context.Provider>;
    };


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