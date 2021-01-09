import React from "react";
import { Paper } from "@material-ui/core";
import { Route, Switch, Link } from "react-router-dom";
import Home from "../../components/Home/Home";
import MachineSettings from "../settings/Machine/Machine";
import MillSettings from "../../components/settings/Mill/Mill";
import Communication from "../settings/Communication/Communication";
import Menu from "../utilities/DropDownMenu";
import Dashboard from "../Dashboard/Dashboard";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Count from "../settings/Count/Count";
import CountAssign from "../settings/CountAssign/CountAssign";
import Machines from "../Machines/Machines";
import Department from "../settings/Department/Department";
import Modal from "../settings/Modal/Modal";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
    color: theme.palette.secondary.main,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  iconbtn: {
    color: theme.palette.secondary.main,
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    width: "100%",
    display: "block",
    padding: "1rem",
  },
  innerContent: {
    padding: "3rem 2rem",
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    background: "#fff",
    width: "100%",
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const routes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/millsettings">
        <MillSettings />
      </Route>
      <Route exact path="/communicationsettings" component={Communication} />
      <Route exact path="/machinesettings" component={MachineSettings} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/countsettings" component={Count} />
      <Route exact path="/countassignment" component={CountAssign} />
      <Route exact path="/machines" component={Machines} />
      <Route exact path="/departments" component={Department} />
      <Route exact path="/machinemodals" component={Modal} />
    </Switch>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="transparent"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton className={classes.iconbtn} onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link className={classes.link} to="/">
            <Typography variant="body1">Home</Typography>
          </Link>
          <Link className={classes.link} to="/dashboard">
            <Typography variant="body1">Dashboard</Typography>
          </Link>
          <Link className={classes.link} to="/machines">
            <Typography variant="body1">Machines</Typography>
          </Link>
          <Divider />
          <Menu
            title="Settings"
            content={[
              "Mill settings",
              "Machine Settings",
              "Communication Settings",
              "Count Settings",
              "Count Assignment",
              "Departments",
              "Machine Modals",
            ]}
          />
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div className={classes.toolbar} />
        <Paper className={classes.innerContent} elevation={3}>
          {routes}
        </Paper>
      </main>
    </div>
  );
}
