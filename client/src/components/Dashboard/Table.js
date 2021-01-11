// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import StyledTableCell from "@material-ui/core/StyledTableCell";
// import TableHead from "@material-ui/core/TableHead";
// import StyledTableRow from "@material-ui/core/StyledTableRow";

// const timeFormat = (s) => {
//   var ms = s % 1000;
//   s = (s - ms) / 1000;
//   var secs = s % 60;
//   s = (s - secs) / 60;
//   var mins = s % 60;
//   var hrs = (s - mins) / 60;
//   if (hrs >= 24) {
//     var day = parseInt(hrs / 24);
//     hrs = hrs % 24;
//     return day + "days:" + hrs + "hrs:" + mins + "mins";
//   }

//   return hrs + "hrs:" + mins + "mins:" + secs + "secs";
// };

// const useStyles = makeStyles((theme) => ({
//   table: {
//     //minWidth: 650,
//     border: "1px solid " + theme.palette.primary.main,
//   },
//   normal: {},
//   doff: {},
//   powerFailure: {
//     border: "1px solid red",
//   },
//   stop: {},
//   toolbar: {
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   toolBarContent: {},
//   tableCell: {},
// }));

// export default function TableClass(props) {
//   const classes = useStyles();
//   const { parameters, result } = props;
//   return (
//     <Table className={classes.table} aria-label="simple table">
//       <TableHead>
//         <StyledTableRow>
//           <StyledTableCell className={classes.tableCell} align="center">
//             MACHINE NO
//           </StyledTableCell>
//           {parameters.map((item, i) => {
//             return (
//               <StyledTableCell className={classes.tableCell} align="center" key={i}>
//                 {item.toUpperCase()}
//               </StyledTableCell>
//             );
//           })}
//         </StyledTableRow>
//       </TableHead>
//       <TableBody>
//         {result.map((item, i) => {
//           let packetData = item.data ? JSON.parse(item.data).data : [];
//           let statusOptions = {
//             1: "stop",
//             0: "normal",
//             2: "doff",
//           };
//           let machineStatus = "normal";
//           if (
//             !packetData.length ||
//             !item.recieved ||
//             Date.now() - Date.parse(item.recieved) > 5000
//           ) {
//             machineStatus = "powerFailure";
//           } else {
//             machineStatus = statusOptions[packetData[13]];
//           }
//           return (
//             <StyledTableRow className={classes[machineStatus]} key={i}>
//               <StyledTableCell
//                 className={classes.tableCell}
//                 align="center"
//                 component="th"
//                 scope="row"
//               >
//                 <div>
//                   <p>{item.machine}</p>
//                   {machineStatus === "powerFailure" && item.recieved ? (
//                     <p
//                       style={{
//                         background: "red",
//                         color: "white",
//                       }}
//                     >
//                       [{timeFormat(Date.now() - Date.parse(item.recieved))}]
//                     </p>
//                   ) : undefined}
//                 </div>
//               </StyledTableCell>
//               {parameters.includes("Kg") ? (
//                 <StyledTableCell align="center" component="th" scope="row">
//                   {packetData.length
//                     ? packetData[26] * 256 + packetData[27] + "kg"
//                     : 0}
//                 </StyledTableCell>
//               ) : undefined}
//               {parameters.includes("m/min") ? (
//                 <StyledTableCell align="center" component="th" scope="row">
//                   {packetData.length
//                     ? packetData[20] * 256 + packetData[21]
//                     : 0}
//                 </StyledTableCell>
//               ) : undefined}
//               {parameters.includes("tpi") ? (
//                 <StyledTableCell align="center" component="th" scope="row">
//                   {packetData.length
//                     ? packetData[28] * 256 + packetData[29]
//                     : 0}
//                 </StyledTableCell>
//               ) : undefined}
//               {parameters.includes("spindle rpm") ? (
//                 <StyledTableCell align="center" component="th" scope="row">
//                   {packetData.length
//                     ? packetData[14] * 256 + packetData[15]
//                     : 0}
//                 </StyledTableCell>
//               ) : undefined}
//               {parameters.includes("AEF %") ? (
//                 <StyledTableCell align="center" component="th" scope="row">
//                   {packetData.length
//                     ? packetData[34] +
//                       " " +
//                       packetData[35] +
//                       " " +
//                       packetData[36] +
//                       " " +
//                       packetData[37]
//                     : 0}
//                 </StyledTableCell>
//               ) : undefined}
//               {parameters.includes("PEF %") ? (
//                 <StyledTableCell align="center" component="th" scope="row">
//                   {packetData.length
//                     ? packetData[30] +
//                       " " +
//                       packetData[31] +
//                       " " +
//                       packetData[32] +
//                       " " +
//                       packetData[33]
//                     : 0}
//                 </StyledTableCell>
//               ) : undefined}
//               {parameters.includes("Stop min") ? (
//                 <StyledTableCell align="center" component="th" scope="row">
//                   {packetData.length ? packetData[65] - packetData[62] : 0}
//                 </StyledTableCell>
//               ) : undefined}
//               {parameters.includes("Doff min") ? (
//                 <StyledTableCell align="center" component="th" scope="row">
//                   {packetData.length ? packetData[58] - packetData[55] : 0}
//                 </StyledTableCell>
//               ) : undefined}
//               {parameters.includes("Ukg") ? (
//                 <StyledTableCell align="center" component="th" scope="row">
//                   {packetData.length
//                     ? packetData[137] +
//                       " " +
//                       packetData[138] +
//                       " " +
//                       packetData[139] +
//                       " " +
//                       packetData[140]
//                     : 0}
//                 </StyledTableCell>
//               ) : undefined}
//             </StyledTableRow>
//           );
//         })}
//       </TableBody>
//     </Table>
//   );
// }
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
import Decode from "../../common/packetDecode";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#dcdede",
    //border: "1px solid black",

    padding: "10px",
  },
  body: {
    fontSize: 14,
    border: "1px solid #dcdede",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    // "&:nth-of-type(odd)": {
    //   backgroundColor: theme.palette.action.hover,
    // },
    // "&:nth-of-type(even)": {
    //   backgroundColor: "#fbedff",
    // },
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
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
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
  tbody: {
    overflowY: "auto",
    overflowX: "auto",
  },
  tableContainer: {
    maxHeight: "50vh",
    width: "100%",
    //border: "1px solid " + theme.palette.primary.main,
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
  console.log(result);
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
      <Paper className={classes.paper}>
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
                    >
                      <StyledTableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.machine}
                      </StyledTableCell>
                      <StyledTableCell>{row.department}</StyledTableCell>
                      {parameters.includes("Model") ? (
                        <StyledTableCell>{row.model}</StyledTableCell>
                      ) : undefined}
                      {parameters.includes("Count") ? (
                        <StyledTableCell>
                          {row.count && row.count.value && row.count.unit
                            ? row.count.value + " " + row.count.unit
                            : "Not assigned"}
                        </StyledTableCell>
                      ) : undefined}
                      {parameters.includes("Kg") ? (
                        <StyledTableCell>{Decode.kg(row)}</StyledTableCell>
                      ) : undefined}
                      {parameters.includes("m/min") ? (
                        <StyledTableCell>{"m/min"}</StyledTableCell>
                      ) : undefined}
                      {parameters.includes("tpi") ? (
                        <StyledTableCell>{"tpi"}</StyledTableCell>
                      ) : undefined}
                      {parameters.includes("spindle rpm") ? (
                        <StyledTableCell>{"spindle rpm"}</StyledTableCell>
                      ) : undefined}
                      {parameters.includes("AEF %") ? (
                        <StyledTableCell>{"AEF%"}</StyledTableCell>
                      ) : undefined}
                      {parameters.includes("PEF %") ? (
                        <StyledTableCell>{"PEF%"}</StyledTableCell>
                      ) : undefined}
                      {parameters.includes("Stops") ? (
                        <StyledTableCell>{"stops"}</StyledTableCell>
                      ) : undefined}
                      {parameters.includes("Stop min") ? (
                        <StyledTableCell>{"Stop min"}</StyledTableCell>
                      ) : undefined}
                      {parameters.includes("Doffs") ? (
                        <StyledTableCell>{"Doff min"}</StyledTableCell>
                      ) : undefined}
                      {parameters.includes("Doff min") ? (
                        <StyledTableCell>{"Doff min"}</StyledTableCell>
                      ) : undefined}
                      {parameters.includes("Ukg") ? (
                        <StyledTableCell>{"UKG"}</StyledTableCell>
                      ) : undefined}
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
