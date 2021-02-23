import React from "react";
import Filter from "../Filter/Filter";
import FilterParam from "../Filter/FilterParam";
import axios from "axios";
import func from "../../common/functions";
const { parameters } = func;
export default function Home() {
  const [machines, setMachines] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [headCells, setHeadCells] = React.useState([...parameters]);

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/machines/all")
      .then((res) => {
        setMachines(res.data.machines);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // React.useEffect(() => {
  //   setFiltered(machines);
  // }, [machines]);

  React.useEffect(() => {
    console.log(filtered);
  }, [filtered]);

  React.useEffect(() => {
    console.log(headCells);
  }, [headCells]);
  return (
    <>
      <Filter machines={machines} cache="home" setMachines={setFiltered} />
      <FilterParam
        cache="homeParam"
        parameters={parameters}
        setParameters={setHeadCells}
      />
    </>
  );
}
