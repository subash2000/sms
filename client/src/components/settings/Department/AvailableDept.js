import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, CircularProgress } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "../../utilities/Alert";

const useStyles = makeStyles({
  container: {
    // width: "90%",
    // maxWidth: 650,

    maxWidth: 650,
  },
  table: {
    width: "100%",
    maxWidth: 650,
  },
  err: {
    textAlign: "center",
    width: "100%",
  },
});

export default function BasicTable(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const deleteHandler = (item) => {
    props.setAlert(undefined);

    setOpen(true);
    axios
      .post(
        process.env.REACT_APP_BACKEND + "/api/settings/mill/department/delete",
        {
          department: item,
        }
      )
      .then((res) => {
        setOpen(false);
        props.setAlert(<Alert type="success" msg={res.data.msg} />);
        console.log(res.data);
        props.update();
      })
      .catch((err) => {
        setOpen(false);
        if (err.response)
          props.setAlert(<Alert type="error" msg={err.response.data} />);
        else
          props.setAlert(
            <Alert type="error" msg="Cannot delete department!Try later" />
          );
      });
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      {open ? (
        <CircularProgress />
      ) : (
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">S.No</TableCell>
              <TableCell align="center">Available Departments</TableCell>
              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.departments.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="center" component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="center">{row}</TableCell>
                <TableCell align="left">
                  <DeleteIcon onClick={() => deleteHandler(row)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
