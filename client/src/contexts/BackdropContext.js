import React, { createContext, useState } from "react";

export const BackDropContext = createContext();

const BackDropContextProvider = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <BackDropContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {props.children}
    </BackDropContext.Provider>
  );
};

export default BackDropContextProvider;
