import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
export default function Loading({ size = 30 }) {
  return (
    <MoonLoader
      color={"green"}
      loading={true}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
