import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Decode from "../../../common/packetDecode";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    padding: "10px",
    whiteSpace: "nowrap",
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
    "&:nth-of-type(even)": {},
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

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
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
                <span className={classes.visuallyHidden}>
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

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    maxWidth: "80vw",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    maxWidth: "500px",
    borderCollapse: "collapse",
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
    color: "white",
    "&:hover": {
      color: "white",
    },
  },
  tbody: {
    overflowY: "auto",
    overflowX: "auto",
  },
  tableContainer: {
    maxHeight: "70vh",

    //maxWidth: "650",
    //border: "1px solid " + theme.palette.primary.main,
  },

  running: {
    // border: "2px solid green",
    color: "green",
    fontSize: "15px",
    fontWeight: "550",
  },
  stop: {
    // border: "5px solid orange",
    color: "red",
    fontSize: "15px",
    fontWeight: "550",
  },
  doff: {
    // border: "5px solid blue",
    color: "blue",
    fontSize: "15px",
    fontWeight: "550",
  },
  powerFailure: {
    // border: "2px solid red",
    color: "red",
    //fontWeight: "700",
    fontSize: "15px",
    fontWeight: "550",
    whiteSpace: "nowrap",
  },
  comm: {
    // border: "2px solid orange",
    color: "brown",
    fontWeight: "550",
    fontSize: "15px",
    whiteSpace: "nowrap",
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const { parameters, result } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const headCells = [
    {
      id: "machine",
      numeric: true,
      disablePadding: true,
      label: "Machine",
    },
    {
      id: "department",
      numeric: false,
      disablePadding: true,
      label: "Department",
    },
    ...parameters.map((item) => ({
      id: item,
      numeric: false,
      disablePadding: true,
      label: item.charAt(0).toUpperCase() + item.slice(1),
    })),
  ];

  const rows = [...result];
  // console.log(result);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <TableContainer className={classes.tableContainer}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody className={classes.tbody}>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      //hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      className={classes[Decode.status(row.data, row.recieved)]}
                    >
                      <StyledTableCell
                        className={
                          classes[Decode.status(row.data, row.recieved)]
                        }
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        <p>{row.machine}</p>
                      </StyledTableCell>
                      <StyledTableCell
                        className={
                          classes[Decode.status(row.data, row.recieved)]
                        }
                      >
                        {row.department}
                      </StyledTableCell>
                      {parameters.includes("Model") ? (
                        <StyledTableCell
                          className={
                            classes[Decode.status(row.data, row.recieved)]
                          }
                        >
                          {row.model}
                        </StyledTableCell>
                      ) : undefined}
                      {parameters.includes("Count") ? (
                        <StyledTableCell
                          className={
                            classes[Decode.status(row.data, row.recieved)]
                          }
                        >
                          {row.count && row.count.value && row.count.unit
                            ? row.count.value + " " + row.count.unit
                            : "Not assigned"}
                        </StyledTableCell>
                      ) : undefined}
                      {parameters.includes("Kg") ? (
                        <StyledTableCell
                          className={
                            classes[Decode.status(row.data, row.recieved)]
                          }
                        >
                          {Decode.kg(row.data)}
                        </StyledTableCell>
                      ) : undefined}
                      {parameters.includes("m/min") ? (
                        <StyledTableCell
                          className={
                            classes[Decode.status(row.data, row.recieved)]
                          }
                        >
                          {Decode.mMin(row.data)}
                        </StyledTableCell>
                      ) : undefined}
                      {parameters.includes("tpi") ? (
                        <StyledTableCell
                          className={
                            classes[Decode.status(row.data, row.recieved)]
                          }
                        >
                          {Decode.tpi(row.data)}
                        </StyledTableCell>
                      ) : undefined}
                      {parameters.includes("spindle rpm") ? (
                        <StyledTableCell
                          className={
                            classes[Decode.status(row.data, row.recieved)]
                          }
                        >
                          {Decode.spindleRpm(row.data)}
                        </StyledTableCell>
                      ) : undefined}
                      {parameters.includes("AEF %") ? (
                        <StyledTableCell
                          className={
                            classes[Decode.status(row.data, row.recieved)]
                          }
                        >
                          {Decode.aef(row.data)}
                        </StyledTableCell>
                      ) : undefined}
                      {parameters.includes("PEF %") ? (
                        <StyledTableCell
                          className={
                            classes[Decode.status(row.data, row.recieved)]
                          }
                        >
                          {Decode.pef(row.data)}
                        </StyledTableCell>
                      ) : undefined}
                      {parameters.includes("Stops") ? (
                        <StyledTableCell
                          className={
                            classes[Decode.status(row.data, row.recieved)]
                          }
                        >
                          {Decode.stops(row.data)}
                        </StyledTableCell>
                      ) : undefined}
                      {parameters.includes("Stop min") ? (
                        <StyledTableCell
                          className={
                            classes[Decode.status(row.data, row.recieved)]
                          }
                        >
                          {Decode.stoppMin(row.data)}
                        </StyledTableCell>
                      ) : undefined}
                      {parameters.includes("Doffs") ? (
                        <StyledTableCell
                          className={
                            classes[Decode.status(row.data, row.recieved)]
                          }
                        >
                          {Decode.doffs(row.data)}
                        </StyledTableCell>
                      ) : undefined}
                      {parameters.includes("Doff min") ? (
                        <StyledTableCell
                          className={
                            classes[Decode.status(row.data, row.recieved)]
                          }
                        >
                          {Decode.doffMin(row.data)}
                        </StyledTableCell>
                      ) : undefined}
                      {parameters.includes("Ukg") ? (
                        <StyledTableCell
                          className={
                            classes[Decode.status(row.data, row.recieved)]
                          }
                        >
                          {"Dont know"}
                        </StyledTableCell>
                      ) : undefined}
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{
                    height: 53 * emptyRows,
                    border: "none",
                    background: "transparent",
                  }}
                >
                  <StyledTableCell style={{ border: "none" }} colSpan={6} />
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
