import React from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import Filter from "../../Filter/Filter";
import {
  Button,
  CircularProgress,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import Modal from "../../utilities/Modal";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import Edit from "./Edit";
import AddIcon from "@material-ui/icons/Add";

const headCells = [
  "Machine",
  "Department",
  "Shed",
  "Model",
  "Spindles",
  "Delivery Roller Dia",
  "Middle Roller Dia",
  "Back Roller Dia",
  "No of teeth(Delivery Roller)",
  "No of teeth(Middle Roller)",
  "No of teeth(Back Roller)",
  "No of teeth(Tin Roller)",
  "Delivery Roller RPM Correction",
  "Middle Roller RPM Correction",
  "Back Roller RPM Correction",
  "Tin Roller RPM Correction",
  "Count",
];

function EnhancedTableHead(props) {
  const { classes } = props;

  return (
    <TableHead className={classes.head}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell} align="center" className={classes.headCell}>
            {headCell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    width: "100%",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Filter machines={props.machines} setMachines={props.setMachines} />
      {/* <Tool onClick={props.onClick} /> */}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    maxWidth: "80vw",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  head: {
    background: theme.palette.primary.main,
  },
  headCell: {
    color: "white",
  },
  tool: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    margin: "0 2px",
  },
  deleteModal: {
    color: theme.palette.error.main,
    fontSize: "20px",
    fontStyle: "italic",
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [machines, setMachines] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [selected, setSelected] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [load, setLoad] = React.useState(false);
  const [snack, setSnack] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("Updated Sucessfully");
  const [deleteModal, setDelete] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    setLoad(true);
    Axios.get(
      process.env.REACT_APP_BACKEND + "/api/settings/machines/all"
    ).then((res) => {
      if (res.data && res.data.machines) {
        setMachines([...res.data.machines]);
      }
    });
  }, []);

  React.useEffect(() => {
    setFiltered(machines);
    setLoad(false);
    setSelected({});
  }, [machines]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, filtered.length - page * rowsPerPage);

  const handleClick = (event, obj) => {
    if (!selected._id || selected._id !== obj._id) setSelected({ ...obj });
    else setSelected({});
  };

  const modalSuccess = () => {
    setOpen(false);
  };
  const modalFailure = () => {
    setOpen(false);
  };

  const updateHandler = () => {
    setOpen(false);
    setLoad(true);
    Axios.get(
      process.env.REACT_APP_BACKEND + "/api/settings/machines/all"
    ).then((res) => {
      if (res.data && res.data.machines) {
        setMachines([...res.data.machines]);
        setSnack(true);
      }
    });
  };

  const deleteHandler = () => {
    setDelete(true);
  };

  const closeSnack = () => {
    setSnack(false);
  };
  const deleteFailureModal = () => {
    setDelete(false);
  };
  const deleteSuccessModal = () => {
    Axios.post(
      process.env.REACT_APP_BACKEND + "/api/settings/machines/single/delete",
      {
        ...selected,
      }
    )
      .then((res) => {
        setDelete(false);
        console.log(res.data);
        setSnackMsg("Deleted SuccessFully");
        updateHandler();
      })
      .catch((err) => {
        setDelete(false);
        if (err.response) console.log(err.response.data);
        console.log(err);
        setSnack(true);
        setSnackMsg("Can't Delete Try Later");
      });
  };
  return (
    <div className={classes.root}>
      {load ? (
        <CircularProgress />
      ) : (
        <Paper className={classes.paper}>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={snack}
            autoHideDuration={6000}
            onClose={closeSnack}
            message={snackMsg}
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={closeSnack}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
          <div className={classes.tool}>
            <EnhancedTableToolbar
              onClick={props.onClick}
              machines={machines}
              setMachines={setFiltered}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={props.onClick}
              className={classes.btn}
            >
              Add
              <AddIcon color="secondary" />
            </Button>
            {Object.keys(selected).length ? (
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => setOpen(true)}
                className={classes.btn}
              >
                Edit
                <EditIcon color="secondary" />
              </Button>
            ) : undefined}
            {Object.keys(selected).length ? (
              <Button
                variant="contained"
                color="primary"
                onClick={deleteHandler}
                className={classes.btn}
              >
                Delete
                <DeleteIcon color="secondary" />
              </Button>
            ) : undefined}
          </div>

          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="medium"
              aria-label="enhanced table"
            >
              <EnhancedTableHead classes={classes} rowCount={filtered.length} />
              <TableBody>
                {filtered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    let isSelected = selected._id && selected._id === row._id;
                    return (
                      <TableRow
                        onClick={(event) => handleClick(event, row)}
                        selected={isSelected}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row.machine}
                        </TableCell>
                        <TableCell align="center">{row.department}</TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row.shed}
                        </TableCell>
                        <TableCell align="center">{row.model}</TableCell>

                        <TableCell align="center">{row.spindles}</TableCell>
                        <TableCell align="center">
                          {row.deliveryRollerDia}
                        </TableCell>
                        <TableCell align="center">
                          {row.middleRollerDia}
                        </TableCell>
                        <TableCell align="center">
                          {row.backRollerDia}
                        </TableCell>
                        <TableCell align="center">
                          {row.deliveryRollerPpr}
                        </TableCell>
                        <TableCell align="center">
                          {row.middleRollerPpr}
                        </TableCell>
                        <TableCell align="center">
                          {row.backRollerPpr}
                        </TableCell>
                        <TableCell align="center">{row.tinRollerPpr}</TableCell>
                        <TableCell align="center">
                          {row.deliveryRollerRpm}
                        </TableCell>
                        <TableCell align="center">
                          {row.middleRollerRpm}
                        </TableCell>

                        <TableCell align="center">
                          {row.backRollerRpm}
                        </TableCell>
                        <TableCell align="center">{row.tinRollerRpm}</TableCell>
                        <TableCell align="center">
                          {row.count
                            ? row.count.value + " " + row.count.unit
                            : "Not Assigned"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 33 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filtered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <Modal
            title="Edit Machine"
            failure="Cancel"
            failureHandler={modalFailure}
            successHandler={modalSuccess}
            open={open}
          >
            <Edit data={selected} update={updateHandler} />
          </Modal>
          <Modal
            title="Delete Machine"
            success="Confirm"
            failure="Cancel"
            failureHandler={deleteFailureModal}
            successHandler={deleteSuccessModal}
            open={deleteModal}
          >
            <p className={classes.deleteModal}>
              Are you sure? The selected machine will be deleted permanently!
            </p>
          </Modal>
        </Paper>
      )}
    </div>
  );
}
