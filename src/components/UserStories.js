import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

//import context
import { Context } from "../context/Context";

//create styles for this component
const useStyles = makeStyles({
    formContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        },
    foaasResponse: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    textField: {
        width: "100%",
    },
    spacer: {
        height: 15,
    },
});

export const UserStories = () => {
    //create variable name to access styles
    const classes = useStyles();

    //destructure context for only the states and functions needed
    const {
        handleCall,
        foaas
    } = useContext(Context);
    // const {
    //     needsName,
    //     setNeedsName,
    //     needsFrom,
    //     setNeedsFrom,
    //     needsThing,
    //     setNeedsThing,
    //     name,
    //     setName,
    //     from,
    //     setFrom,
    //     thing,
    //     setThing,
    //     foaas,
    //     setFoaas,
    //     handleFOAAS,
    //     setRandomNumber,
    // } = useContext(Context);

    //local function to reset api
    //sets context states individually
    // const resetFOAAS = () => {
    //     setFoaas(null);
    //     setNeedsName(false);
    //     setNeedsFrom(false);
    //     setNeedsThing(false);
    //     setName("");
    //     setFrom("");
    //     setThing("");
    //     setRandomNumber(Math.floor(Math.random() * 4) + 1);
    // };

    return (
        <div className={classes.formContainer}>
            These are gonna be stories!
            {foaas && (
        <div className={classes.foaasResponse}>
            <p variant="h3" component="div" sx={{ paddingBottom: 5 }}>
                {foaas.map((element, idx)=>(
                    <ul>
                        <li>
                            {element.title}
                            </li>
                    </ul>
                ))}
            </p>
        </div>
        )}
            <button
                variant="contained"
                onClick={() => {
                    console.log("I'm clicked")
                    handleCall()
                    }
                }
            >
                click me
            </button>
        </div>
    
    );
};

    // {/* Only displays text after successful api call
    //     {foaas && (
    //         <div className={classes.foaasResponse}>
    //         <Typography variant="h3" component="div" sx={{ paddingBottom: 5 }}>
    //             {foaas.message}
    //         </Typography>
    //         <Typography variant="h5" component="div" sx={{ paddingBottom: 15 }}>
    //             {foaas.subtitle}
    //         </Typography>
    //         </div>
    //     )}
    //     {/* Displays appropriate text fields depending on which api endpoint is selected */}
    //     {!foaas && (
    //         <Typography
    //         variant="h4"
    //         component="div"
    //         sx={{ paddingBottom: 5, textAlign: "center" }}
    //         >
    //         Please fill out the following forms:
    //         </Typography>
    //     )}
    //     {needsName && !foaas && (
    //         <>
    //         <TextField
    //             className={classes.textField}
    //             id="userName_field"
    //             value={name}
    //             onChange={(e) => setName(e.target.value)}
    //             variant="outlined"
    //             placeholder="Name"
    //         />
    //         <div className={classes.spacer}></div>
    //         </>
    //     )}
    //     {needsFrom && !foaas && (
    //         <>
    //         <TextField
    //             className={classes.textField}
    //             id="userName_field"
    //             value={from}
    //             onChange={(e) => setFrom(e.target.value)}
    //             variant="outlined"
    //             placeholder="From"
    //         />
    //         <div className={classes.spacer}></div>
    //         </>
    //     )}
    //     {needsThing && !foaas && (
    //         <>
    //         <TextField
    //             className={classes.textField}
    //             id="userName_field"
    //             value={thing}
    //             onChange={(e) => setThing(e.target.value)}
    //             variant="outlined"
    //             placeholder="Thing"
    //         />
    //         <div className={classes.spacer}></div>
    //         </>
    //     )}
    //     {/* Dynamical renders button content and onClick function */}
    //     <Button
    //         variant="contained"
    //         onClick={() => (!foaas ? handleFOAAS() : resetFOAAS())}
    //     >
    //         {!foaas ? "Submit" : "Another?"}
    //     </Button>
    //     </div> */}