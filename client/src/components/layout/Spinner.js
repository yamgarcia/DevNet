import React from "react";
import spinner from "./spinner.gif";

export default () => (
  <>
    <img
      src={spinner}
      alt='Loading'
      style={{ width: "100px", margin: "auto", display: "block" }}
    />
  </>
);
