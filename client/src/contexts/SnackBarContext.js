import React, { createContext, useState } from "react";
export const SnackBarContext = createContext();

const SnackBarContextProvider = (props) => {
  const [snack, setSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const handleClick = () => {
    setSnack(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack(false);
  };
  return (
    <SnackBarContext.Provider
      value={{
        snack,
        setSnack,
        handleClick,
        handleClose,
        setSnackMsg,
        snackMsg,
      }}
    >
      {props.children}
    </SnackBarContext.Provider>
  );
};
export default SnackBarContextProvider;
