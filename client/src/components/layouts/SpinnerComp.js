import React from "react";
import Spinner from "./spinner";
const SpinnerComp = () => {
  return (
    <div>
      <img
        src={Spinner}
        alt="Loading..."
        style={{ width: "300px", margin: "auto", display: "block" }}
      />
    </div>
  );
};

export default SpinnerComp;
