import { Button } from "@material-ui/core";
import React from "react";
import "./print.css";

const printHandler = () => {
  // const doc = new jspdf();

  // doc.html(document.getElementById("print"), {
  //   callback: function (d) {
  //     d.save("boom");
  //   },

  //   x: 10,
  //   y: 10,
  // });
  window.print();
};
export default function Report() {
  return (
    <>
      <div id="section-to-print"></div>
      {/* <Document /> */}
      <Button onClick={printHandler}>Print</Button>
    </>
  );
}
