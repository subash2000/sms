import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import Modal from "./Modal";
import { Button } from "@material-ui/core";
import SetCount from "./SetCount";
import SnackBar from "../../utilities/SnackBar";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    //border: "1px solid black",
    // "#dcdede"

    padding: "10px",
    // border: "1px solid #fff",
    //whiteSpace: "nowrap",
  },
  body: {
    fontSize: 14,
    border: "1px solid #dcdede",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:nth-of-type(even)": {
      // backgroundColor: "#fbedff",
    },
  },
}))(TableRow);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "machine",
    numeric: true,
    disablePadding: true,
    label: "Machine No",
  },
  {
    id: "model",
    numeric: false,
    disablePadding: false,
    label: "Model",
  },
  {
    id: "department",
    numeric: false,
    disablePadding: false,
    label: "Department",
  },
  {
    id: "currcount",
    numeric: true,
    disablePadding: false,
    label: "Current Count",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox" style={{ color: "white" }}>
          <Checkbox
            style={{ color: "white" }}
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            style={{ color: "white" }}
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{ color: "white" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span
                  className={classes.visuallyHidden}
                  style={{ color: "white" }}
                >
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
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
  btn: {
    width: "150px",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, selected } = props;
  const [model, setModel] = React.useState(false);

  const closeHandler = () => {
    setModel(false);
  };
  const openHandler = () => {
    setModel(true);
  };
  const applyHandler = () => {
    console.log("Applying...");
    closeHandler();
  };
  const setCount = () => {
    console.log(selected);
    openHandler();
  };
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Modal
        title="Set Count"
        open={model}
        setOpen={setModel}
        success="Apply"
        failure="Cancel"
        successHandler={applyHandler}
        failureHandler={closeHandler}
      >
        <SetCount
          selected={selected}
          alert={props.alert}
          setAlert={props.setAlert}
          closeModel={closeHandler}
          updateMachines={props.updateMachines}
          snack={props.snack}
          setSnack={props.setSnack}
          snackMsg={props.snackMsg}
          setSnackMsg={props.setSnackMsg}
        />
      </Modal>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="primary"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : undefined}

      {numSelected > 0 ? (
        <Tooltip title="Set count for selected machines">
          <Button
            className={classes.btn}
            size="small"
            variant="contained"
            color="primary"
            onClick={setCount}
          >
            Set Count
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" onClick={props.filterHandler}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    padding: "1rem",
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
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("machine");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [alert, setAlert] = React.useState(undefined);
  const [snack, setSnack] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");

  const [department, setDepartment] = React.useState("All");
  const [count, setCount] = React.useState("All");
  const [model, setModel] = React.useState("All");
  let rows = props.machineData;
  console.log(rows);
  React.useEffect(() => {
    let cache = localStorage.getItem("countFilter");
    if (cache) {
      let filters = JSON.parse(cache);
      setDepartment(filters.department);
      setCount(filters.count);
      setModel(filters.model);
    }
  }, []);
  if (rows.length < 1) {
    return <h2>No Machines found</h2>;
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) =>
        JSON.stringify({ machine: n.machine, department: n.department })
      );
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, machine, dept) => {
    let string = JSON.stringify({ machine, department: dept });

    const selectedIndex = selected.indexOf(string);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, string);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (machine, dept) =>
    selected.indexOf(JSON.stringify({ machine, department: dept })) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  rows = rows.filter((machine) => {
    let validModel = model === "All" || model === machine.model;
    let validDept = department === "All" || department === machine.department;
    let validCount =
      count === "All" || count === machine.currcount + machine.unit;
    return validCount && validDept && validModel;
  });
  return (
    <div className={classes.root}>
      {alert}
      <SnackBar open={snack} setOpen={setSnack} msg={snackMsg} />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          machineData={rows}
          numSelected={selected.length}
          selected={selected}
          filterHandler={props.filterHandler}
          alert={alert}
          setAlert={setAlert}
          updateMachines={props.updateMachines}
          snack={snack}
          setSnack={setSnack}
          snackMsg={snackMsg}
          setSnackMsg={setSnackMsg}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              machineData={rows}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(
                    row.machine,
                    row.department
                  );
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, row.machine, row.department)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.machine}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.model}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.department}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.currcount === "Not assingned" ? (
                          <i>{row.currcount}</i>
                        ) : (
                          row.currcount + " " + row.unit
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
