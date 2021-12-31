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
    // const [randomNumber, setRandomNumber] = useState(null);
    // const [needsName, setNeedsName] = useState(false);
    // const [needsFrom, setNeedsFrom] = useState(false);
    // const [needsThing, setNeedsThing] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    // const [name, setName] = useState("");
    // const [from, setFrom] = useState("");
    // const [thing, setThing] = useState("");
    const [foaas, setFoaas] = useState(null);

    //variable for api url
    // const baseUrl = "https://www.foaas.com/awesome/Nick";

    //variable for MY api url
    const url = "https://pjw1.herokuapp.com/stories/read"

    //Function to handle when user clicks login button
    //User name and Password only needs to be present to pass log i
    const handleLogIn = () => {
        if (userName && password) {
        setIsSignedIn(true);
        // setRandomNumber(Math.floor(Math.random() * 4) + 1);
        } else {
        alert("Please enter any username and password");
        }
    };

    const handleCall = async () => {
        await axios.get(url).
        then((res)=> {
            console.log("res.data in handleCall():", res.data)
            setFoaas(res.data);
        })
    }
    // if (urlParams) {
    //     await axios.get(baseUrl + urlParams).then((response) => {
    //         // console.log(response.data);
    //         //Sets state with data the comes back from api call
    //         setFoaas(response.data);
    //     });
    //     }
    // };

    //Function to handle Log Out reset states
    // const handleLogOut = () => {
    //     setIsSignedIn(false);
    //     setUserName("");
    //     setPassword("");
    //     setRandomNumber(null);
    //     setName("");
    //     setThing("");
    //     setFrom("");
    //     setNeedsThing(false);
    //     setNeedsName(false);
    //     setNeedsFrom(false);
    //     setFoaas(null);
    // };



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
        handleCall,
        // handleLogOut,
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
        foaas,
        // setFoaas,
        // handleFOAAS,
        // setRandomNumber,
    };

    //Return statement that will wrap any child elements with the exported context states and functions
    return <Context.Provider value={value}>{children}</Context.Provider>;
    };
