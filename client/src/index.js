import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import BackDropContextProvider from "./contexts/BackdropContext";
import SnackBarContextProvider from "./contexts/SnackBarContext";

ReactDOM.render(
  <BackDropContextProvider>
    <SnackBarContextProvider>
      <App />
    </SnackBarContextProvider>
  </BackDropContextProvider>,
  document.getElementById("root")
);
