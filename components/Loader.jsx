import React from "react";
import "../styles/loader.css";
const Loader = () => {
  return (
    <div className="flex flex-1 justify-center items-center ">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
