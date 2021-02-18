import React from "react";
import Filter from "../Filter/Filter";
import axios from "axios";
export default function Home() {
  const [machines, setMachines] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);

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

  React.useEffect(() => {
    setFiltered(machines);
  }, [machines]);

  React.useEffect(() => {
    console.log(filtered);
  }, [filtered]);
  return <Filter machines={machines} cache="home" setMachines={setFiltered} />;
}
