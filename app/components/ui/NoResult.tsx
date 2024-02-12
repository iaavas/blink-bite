import Image from "next/image";
import React from "react";
import Nav from "./Nav";

function NoResult() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Image
          src={"/noResult.png"}
          width={400}
          height={400}
          alt="No Result"
          className="flex items-center justify-center"
        />
        <h1 className="text-gray-200 font-bold tracking-wide text-center text-4xl p-4">
          Nothing Here Yet
        </h1>
      </div>
    </>
  );
}

export default NoResult;
