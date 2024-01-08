import React from "react";
import HashLoader from "react-spinners/HashLoader";
export default function Loading() {
  return (
    <center>
      <HashLoader
        color={"#bfdbfe"}
        loading={true}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </center>
  );
}
