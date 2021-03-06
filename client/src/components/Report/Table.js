import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Decode from "../../common/packetDecode";
import axios from "axios"


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
    fontWeight:"900"
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  // root: {
  //   '&:nth-of-type(odd)': {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  // },
}))(TableRow);




const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  details:{
      display:"flex",
      justifyContent:"space-between",
      padding:"5px"
  },
  summary:{
    fontWeight:"900"
  }
});

export default function CustomizedTables(props) {
 
  const classes = useStyles();
   const {count,department,model,machines,parameters} = props
   const [details,setDetails] = React.useState({})
   const [kg, setKg] = React.useState(0);
   const [eff, setEff] = React.useState(0);
   const [doff, setDoff] = React.useState(0);
   const sumArray = (arr) => {
    let sum = arr.reduce((acc, val) => acc + val);
    return sum;
  };
  React.useEffect(() => {
     axios.get(process.env.REACT_APP_BACKEND + "/api/report/details").then(response => {
     if(Object.keys(response.data.result))
     {
       setDetails({...response.data.result})
     }
    })
      .catch(error => {
        if (error.response)
          console.log(error.response.data);
      })
  },[])

  React.useEffect(() => {
    if(machines && machines.length) {
      let kgArr = machines.map((item) => {
        return Decode.kg(item.data);
      });
      console.log(kgArr)
      setKg(sumArray(kgArr));
      let doffArr = machines.map((item) => {
        return Decode.doffs(item.data);
      });
      setDoff(sumArray(doffArr));
      let effArr = machines.map((item) => {
        return Decode.aef(item.data);
      });
      setEff(sumArray(effArr) / props.machines.length);
    }
    // eslint-disable-next-line
  },[machines])


  return (
    <TableContainer component={Paper}>
        <div className={classes.details}>
            <h3>Shift : {props.shift}</h3>
            <h3>Date : {props.date}</h3>
        </div>
      
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
             <StyledTableCell align="center">Machine</StyledTableCell>
              <StyledTableCell align="center">Department</StyledTableCell>
              {parameters.includes("Model")?<StyledTableCell align="center">Model</StyledTableCell>:undefined}
              {parameters.includes("Count")?<StyledTableCell align="center">Count</StyledTableCell>:undefined}
              {parameters.includes("Kg")?<StyledTableCell align="center">Kg</StyledTableCell>:undefined}
              {parameters.includes("m/min")?<StyledTableCell align="center">m/min</StyledTableCell>:undefined}
              {parameters.includes("tpi")?<StyledTableCell align="center">TPI</StyledTableCell>:undefined}
              {parameters.includes("spindle rpm")?<StyledTableCell align="center">Spindle RPM</StyledTableCell>:undefined}
              {parameters.includes("Doffs")?<StyledTableCell align="center">Doffs</StyledTableCell>:undefined}
              {parameters.includes("Doff min")?<StyledTableCell align="center">Doff min</StyledTableCell>:undefined}
              {parameters.includes("Stops")?<StyledTableCell align="center">Stops</StyledTableCell>:undefined}
              {parameters.includes("Stop min")?<StyledTableCell align="center">Stop min</StyledTableCell>:undefined}
              {parameters.includes("AEF %")?<StyledTableCell align="center">AEF%</StyledTableCell>:undefined}
              {parameters.includes("PEF %")?<StyledTableCell align="center">PEF%</StyledTableCell>:undefined}
              {parameters.includes("Ukg")?<StyledTableCell align="center">UKG</StyledTableCell>:undefined}
              
          </TableRow>
        </TableHead>
        <TableBody>
          {machines.filter(row => {
              let dep = department === "All" || (details[row.ip] && details[row.ip].department && details[row.ip].department === department);
              let mod = model === "All" || (details[row.ip] && details[row.ip].model && details[row.ip].model === model);
              let c =
                count === "All" ||
                (details[row.ip] && details[row.ip].count && details[row.ip].count.value && details[row.ip].count.value+details[row.ip].count.unit===count)
                return dep && mod && c; 
          }).map((row,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell align="center" component="th" scope="row">
                {details[row.ip]?details[row.ip].machine:""}
              </StyledTableCell>
              <StyledTableCell align="center">{details[row.ip]?details[row.ip].department:""}</StyledTableCell>
              {parameters.includes("Model")?<StyledTableCell align="center">{details[row.ip]?details[row.ip].model:""}</StyledTableCell>:undefined}
              {parameters.includes("Count")?<StyledTableCell align="center">{details[row.ip] && details[row.ip].count && details[row.ip].count.value?details[row.ip].count.value+details[row.ip].count.unit:""}</StyledTableCell>:undefined}
              {parameters.includes("Kg")?<StyledTableCell align="center">{Decode.kg(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("m/min")?<StyledTableCell align="center">{Decode.mMin(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("tpi")?<StyledTableCell align="center">{Decode.tpi(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("spindle rpm")?<StyledTableCell align="center">{Decode.spindleRpm(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("Doffs")?<StyledTableCell align="center">{Decode.doffs(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("Doff min")?<StyledTableCell align="center">{Decode.doffMin(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("Stops")?<StyledTableCell align="center">{Decode.stops(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("Stop min")?<StyledTableCell align="center">{Decode.stoppMin(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("AEF %")?<StyledTableCell align="center">{Decode.aef(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("PEF %")?<StyledTableCell align="center">{Decode.pef(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("Ukg")?<StyledTableCell align="center">{Decode.ukg(row.data)}</StyledTableCell>:undefined}

            </StyledTableRow>
          ))}
          <StyledTableRow>
             <StyledTableCell className={classes.summary}  align="center" component="th" scope="row">
                Summary
              </StyledTableCell>
              <StyledTableCell className={classes.summary} align="center">-</StyledTableCell>
              {parameters.includes("Model")?<StyledTableCell className={classes.summary} align="center">-</StyledTableCell>:undefined}
              {parameters.includes("Count")?<StyledTableCell className={classes.summary} align="center">-</StyledTableCell>:undefined}
              {parameters.includes("Kg")?<StyledTableCell className={classes.summary} align="center">{kg}</StyledTableCell>:undefined}
              {parameters.includes("m/min")?<StyledTableCell className={classes.summary} align="center">-</StyledTableCell>:undefined}
              {parameters.includes("tpi")?<StyledTableCell className={classes.summary} align="center">-</StyledTableCell>:undefined}
              {parameters.includes("spindle rpm")?<StyledTableCell className={classes.summary} align="center">-</StyledTableCell>:undefined}
              {parameters.includes("Doffs")?<StyledTableCell className={classes.summary} align="center">{doff}</StyledTableCell>:undefined}
              {parameters.includes("Doff min")?<StyledTableCell className={classes.summary} align="center">-</StyledTableCell>:undefined}
              {parameters.includes("Stops")?<StyledTableCell className={classes.summary} align="center">-</StyledTableCell>:undefined}
              {parameters.includes("Stop min")?<StyledTableCell className={classes.summary} align="center">-</StyledTableCell>:undefined}
              {parameters.includes("AEF %")?<StyledTableCell className={classes.summary} align="center">{eff}</StyledTableCell>:undefined}
              {parameters.includes("PEF %")?<StyledTableCell className={classes.summary} align="center">-</StyledTableCell>:undefined}
              {parameters.includes("Ukg")?<StyledTableCell className={classes.summary} align="center">-</StyledTableCell>:undefined}
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
