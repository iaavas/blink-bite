import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href="/"
      className="text-3xl  font-urban tracking-wider	font-bold  text-center sm:ml-48 flex justify-center items-center"
    >
      Vástrá
    </Link>
  );
}

export default Logo;
