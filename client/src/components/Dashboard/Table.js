import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FilterBtn from "./FilterBtn";
const timeFormat = (s) => {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;
  if (hrs >= 24) {
    var day = parseInt(hrs / 24);
    hrs = hrs % 24;
    return day + "days:" + hrs + "hrs:" + mins + "mins";
  }

  return hrs + "hrs:" + mins + "mins:" + secs + "secs";
};

const useStyles = makeStyles((theme) => ({
  table: {
    //minWidth: 650,
    border: "1px solid " + theme.palette.primary.main,
  },
  normal: {},
  doff: {},
  powerFailure: {
    border: "1px solid red",
  },
  stop: {},
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  toolBarContent: {},
  tableCell: {},
}));

export default function BasicTable(props) {
  const classes = useStyles();
  const {
    data,
    parameters,
    selected,
    machines,
    setParameters,
    setSelected,
    setMachines,
  } = props;
  const [names, setNames] = React.useState([]);
  const [sheds, setSheds] = React.useState([]);
  const [types, setTypes] = React.useState([]);

  React.useEffect(() => {
    let cache = localStorage.getItem("dashboardFilterOptions");
    if (cache) {
      let filters = JSON.parse(cache);
      setNames(filters.names);
      setSheds(filters.sheds);
      setTypes(filters.types);
    }
  }, []);

  let arr = [...machines].filter((item) => {
    return (
      sheds.indexOf(item.shed) !== -1 ||
      names.indexOf(item.name) !== -1 ||
      types.indexOf(item.type) !== -1
    );
  });

  let result = arr.length > 0 ? arr : machines;

  return (
    <TableContainer>
      <div className={classes.toolbar}>
        <div className={classes.toolBarContent}>
          <h3>
            {data[Object.keys(data)[0]] &&
            data[Object.keys(data)[0]].data &&
            data[Object.keys(data)[0]].data.data
              ? "Shift No : " + data[Object.keys(data)[0]].data.data[9]
              : "Machines not connected"}
          </h3>
        </div>
        <FilterBtn
          parameters={parameters}
          setParameters={setParameters}
          selected={selected}
          setSelected={setSelected}
          setMachines={setMachines}
        />
      </div>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell} align="center">
              MACHINE NO
            </TableCell>
            {parameters.map((item, i) => {
              return (
                <TableCell className={classes.tableCell} align="center" key={i}>
                  {item.toUpperCase()}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((item, i) => {
            let packetData = item.data ? JSON.parse(item.data).data : [];
            let statusOptions = {
              1: "stop",
              0: "normal",
              2: "doff",
            };
            let machineStatus = "normal";
            if (
              !packetData.length ||
              !item.recieved ||
              Date.now() - Date.parse(item.recieved) > 5000
            ) {
              machineStatus = "powerFailure";
            } else {
              machineStatus = statusOptions[packetData[13]];
            }
            return (
              <TableRow className={classes[machineStatus]} key={i}>
                <TableCell
                  className={classes.tableCell}
                  align="center"
                  component="th"
                  scope="row"
                >
                  <div>
                    <p>{item.machine}</p>
                    {machineStatus === "powerFailure" && item.recieved ? (
                      <p
                        style={{
                          background: "red",
                          color: "white",
                        }}
                      >
                        [{timeFormat(Date.now() - Date.parse(item.recieved))}]
                      </p>
                    ) : undefined}
                  </div>
                </TableCell>
                {parameters.includes("Kg") ? (
                  <TableCell align="center" component="th" scope="row">
                    {packetData.length
                      ? packetData[26] * 256 + packetData[27] + "kg"
                      : 0}
                  </TableCell>
                ) : undefined}
                {parameters.includes("m/min") ? (
                  <TableCell align="center" component="th" scope="row">
                    {packetData.length
                      ? packetData[20] * 256 + packetData[21]
                      : 0}
                  </TableCell>
                ) : undefined}
                {parameters.includes("tpi") ? (
                  <TableCell align="center" component="th" scope="row">
                    {packetData.length
                      ? packetData[28] * 256 + packetData[29]
                      : 0}
                  </TableCell>
                ) : undefined}
                {parameters.includes("spindle rpm") ? (
                  <TableCell align="center" component="th" scope="row">
                    {packetData.length
                      ? packetData[14] * 256 + packetData[15]
                      : 0}
                  </TableCell>
                ) : undefined}
                {parameters.includes("AEF %") ? (
                  <TableCell align="center" component="th" scope="row">
                    {packetData.length
                      ? packetData[34] +
                        " " +
                        packetData[35] +
                        " " +
                        packetData[36] +
                        " " +
                        packetData[37]
                      : 0}
                  </TableCell>
                ) : undefined}
                {parameters.includes("PEF %") ? (
                  <TableCell align="center" component="th" scope="row">
                    {packetData.length
                      ? packetData[30] +
                        " " +
                        packetData[31] +
                        " " +
                        packetData[32] +
                        " " +
                        packetData[33]
                      : 0}
                  </TableCell>
                ) : undefined}
                {parameters.includes("Stop min") ? (
                  <TableCell align="center" component="th" scope="row">
                    {packetData.length ? packetData[65] - packetData[62] : 0}
                  </TableCell>
                ) : undefined}
                {parameters.includes("Doff min") ? (
                  <TableCell align="center" component="th" scope="row">
                    {packetData.length ? packetData[58] - packetData[55] : 0}
                  </TableCell>
                ) : undefined}
                {parameters.includes("Ukg") ? (
                  <TableCell align="center" component="th" scope="row">
                    {packetData.length
                      ? packetData[137] +
                        " " +
                        packetData[138] +
                        " " +
                        packetData[139] +
                        " " +
                        packetData[140]
                      : 0}
                  </TableCell>
                ) : undefined}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
