import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { HashRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import theme from "./Theme";
const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Sidebar />
      </ThemeProvider>
    </Router>
  );
};

export default App;
