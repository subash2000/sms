import React from "react";
import PageTitle from "../utilities/PageTitle";
import DateField from "../utilities/DateField";
import SelectMultiple from "../utilities/SelectMultiple";
import axios from "axios";
import { Button, makeStyles, Tooltip,IconButton } from "@material-ui/core";
import PrintIcon from '@material-ui/icons/Print';
import funct from "../../common/functions"
import FilterOpt from "./Filter/Filter"
import FilterParam from "./Filter/FilterParam"
import Result from "./Result"
import Alert from "../utilities/Alert";
// import pdf from "../../common/generateReport"
// const {reportPdf} = pdf
const {parameters} = funct
const useStyles = makeStyles((theme) => ({
  fields: {
    display: "flex",
    justifyContent: "space-between",
    gap: "8rem",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      gap: "0",
    },
  },
  toolbar:{
    width:"100%",
    display:"flex",
    justifyContent:"flex-end"
  },
}));
export default function Report() {
  const [from, setFrom] = React.useState(Date.now());
  const [to, setTo] = React.useState(Date.now());
  const [shifts, setShifts] = React.useState(["1", "2", "3"]);
  const [log, setLog] = React.useState([])
  const [department, setDepartment] = React.useState("All");
  const [count, setCount] = React.useState("All");
  const [model, setModel] = React.useState("All");
  const [headCells,setheadCells] = React.useState([])
  const [err,setErr] = React.useState(undefined)

  const classes = useStyles();
  var getDates = function (start, end, cb) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt).toDateString());
    }
    return arr;
  };
  const compareDate = (a,b) => {
    let date1 = Date.parse(a.date)
    let date2 =Date.parse(b.date)
    if(date1 < date2)
      return -1;
    else if(date1>date2)
      return 1;
    return 0;
  }
  const compareShift = (a,b) => {
    
    if(a.shift < b.shift)
      return -1;
    else if(a.shift>b.shift)
      return 1;
    return 0;
  }
  React.useEffect(() => {
    let str = localStorage.getItem("reportParam");
    if (str) {
      let obj = JSON.parse(str);
    
      setheadCells([...obj.right]);
    }
    else if(!str)
    {
      setheadCells([...parameters])
    }
    // eslint-disable-next-line
  }, []);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLog([])
  
    axios.post(process.env.REACT_APP_BACKEND + "/api/report/production", {
      dates: getDates(from, to),
      shifts: shifts.map(item => (parseInt(item))),
    }).then(response => {
     if(response.data.result && response.data.result.length)
     {
       let result = [...response.data.result];
       result.sort(compareShift)
       result.sort(compareDate)
       console.log(result)
       setLog(result)
       setErr(undefined)

     }
     else
     {
       setErr(<Alert type="warning" msg="No Data Found" />)

     }
    })
      .catch(error => {
        if (error.response)
          console.log(error.response.data);
        setErr(<Alert type="warning" msg="No Data Found" />)

      })
  
    
  }

  const printPdf = () => {
    window.print()
  }

  return (
    <div>
      <PageTitle text="Production Report" />
      <form onSubmit={handleSubmit} className={classes.form}>
        <DateField
          value={from}
          setDate={setFrom}
          variant="outlined"
          required={true}
          label="From "
          maxDate={to}

        />
        <DateField
          value={to}
          setDate={setTo}
          variant="outlined"
          required={true}
          label="To"
          maxDate={new Date()}

        />

        <SelectMultiple
          selected={shifts}
          setSelected={setShifts}
          menuItems={["1", "2", "3"]}
          label="Shifts"
        />
        <div style={{ width: "100%", textAlign: "center" }}>
          <Button color="primary" variant="contained" type="submit">
            View
          </Button>
        </div>
      </form>
      {log.length?(
        <>
         
           <FilterOpt 
            setDepartment={setDepartment} 
            setModel={setModel} 
            setCount={setCount} 
            count={count} 
            department={department}
            model={model}
        />
        <div className={classes.toolbar}> 
          <Tooltip title="Print" placement="top">
              <IconButton color="primary" component="span" onClick={printPdf}>
                <PrintIcon />
              </IconButton>
          </Tooltip>
          <FilterParam parameters={headCells} setParameters={setheadCells} cache="reportParam"/>
        </div>
    
       <div className="report">
        <Result 
        logs={log}
        count={count} 
        department={department}
        model={model}
        parameters={headCells}
        />
        </div>
        </>

      ):err}
    </div>
  );
}
