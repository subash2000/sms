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
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);




const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  details:{
      display:"flex",
      justifyContent:"space-between",
      padding:"5px"
  }
});

export default function CustomizedTables(props) {
 
  const classes = useStyles();
   const {count,department,model,machines,parameters} = props
     const [details,setDetails] = React.useState({})


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
              {parameters.map((item,i) => {
                  return <StyledTableCell key={i} align="center">{item}</StyledTableCell>
              })}
           
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
              {parameters.includes("AEF %")?<StyledTableCell align="center">{Decode.aef(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("Count")?<StyledTableCell align="center">{details[row.ip] && details[row.ip].count && details[row.ip].count.value?details[row.ip].count.value+details[row.ip].count.unit:""}</StyledTableCell>:undefined}
              {parameters.includes("Doff min")?<StyledTableCell align="center">{Decode.doffMin(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("Doffs")?<StyledTableCell align="center">{Decode.doffs(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("Kg")?<StyledTableCell align="center">{Decode.kg(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("Model")?<StyledTableCell align="center">{details[row.ip]?details[row.ip].model:""}</StyledTableCell>:undefined}
              {parameters.includes("PEF %")?<StyledTableCell align="center">{Decode.pef(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("Stop min")?<StyledTableCell align="center">{Decode.stoppMin(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("Stops")?<StyledTableCell align="center">{Decode.stops(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("m/min")?<StyledTableCell align="center">{Decode.mMin(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("Ukg")?<StyledTableCell align="center">{Decode.ukg(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("spindle rpm")?<StyledTableCell align="center">{Decode.spindleRpm(row.data)}</StyledTableCell>:undefined}
              {parameters.includes("tpi")?<StyledTableCell align="center">{Decode.tpi(row.data)}</StyledTableCell>:undefined}

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
