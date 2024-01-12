import React from "react";
import HashLoader from "react-spinners/HashLoader";
export default function Loading({ size = 30 }) {
  return (
    <center>
      <HashLoader
        color={"#bfdbfe"}
        loading={true}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </center>
  );
}
