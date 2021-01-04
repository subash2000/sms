import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import theme from "./Theme";
import Backdrop from "./components/utilities/Backdrop";
import { BackDropContext } from "./contexts/BackdropContext";
const App = () => {
  const { open, setOpen } = React.useContext(BackDropContext);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Backdrop open={open} setOpen={setOpen} />
        <Sidebar />
      </ThemeProvider>
    </Router>
  );
};

export default App;
