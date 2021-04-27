import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Decode from "../../common/packetDecode";

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

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>Machine</TableCell>
        <TableCell>Department</TableCell>
        <TableCell>ry(Volts)</TableCell>
        <TableCell>yb(Volt)</TableCell>
        <TableCell>br(Volt)</TableCell>
        <TableCell>r(Ampere)</TableCell>
        <TableCell>y(Ampere)</TableCell>
        <TableCell>b(Ampere)</TableCell>
      </TableRow>
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    // minWidth: 750,
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

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // borderBottom: "unset",
    },
  },
  selected: {
    background: "#e0e0e0",
  },
}));
function Row(props) {
  const { row, setSelected, selected } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const rowStyle = {
    cursor: "pointer",
  };

  return (
    <React.Fragment>
      <TableRow
        className={
          classes.root +
          " " +
          (selected.machine === row.machine &&
          selected.department === row.department
            ? classes.selected
            : "")
        }
        onClick={() => setSelected({ ...row })}
        style={rowStyle}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.machine}</TableCell>
        <TableCell>{row.department}</TableCell>
        <TableCell>{Decode.ry(row.data)}</TableCell>
        <TableCell>{Decode.yb(row.data)}</TableCell>
        <TableCell>{Decode.br(row.data)}</TableCell>
        <TableCell>{Decode.r(row.data)}</TableCell>
        <TableCell>{Decode.y(row.data)}</TableCell>
        <TableCell>{Decode.b(row.data)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <p className={classes.innerContent}>
                <b>Machine : </b>
                {row.machine}
              </p>
              <p className={classes.innerContent}>
                <b>Department : </b>
                {row.department}
              </p>
              <p className={classes.innerContent}>
                <b>ry Volt : </b>
                {Decode.ry(row.data)}
              </p>
              <p className={classes.innerContent}>
                <b>yb Volt : </b>
                {Decode.yb(row.data)}
              </p>
              <p className={classes.innerContent}>
                <b>br Volt : </b>
                {Decode.br(row.data)}
              </p>
              <p className={classes.innerContent}>
                <b>r Ampere : </b>
                {Decode.r(row.data)}
              </p>
              <p className={classes.innerContent}>
                <b>y Ampere : </b>
                {Decode.y(row.data)}
              </p>
              <p className={classes.innerContent}>
                <b>b Ampere : </b>
                {Decode.b(row.data)}
              </p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function EnhancedTable({ machines, setSelected, selected }) {
  const classes = useStyles();
  const [order] = React.useState("asc");
  const [orderBy] = React.useState("machine");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, machines.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead classes={classes} rowCount={machines.length} />
            <TableBody>
              {stableSort(machines, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <Row
                      key={index}
                      row={row}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={machines.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
