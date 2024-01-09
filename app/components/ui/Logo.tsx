import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href="/"
      className="ml-4 text-3xl  font-urban tracking-wider	font-bold text-center flex items-center justify-center"
    >
      Vástrá
    </Link>
  );
}

export default Logo;
