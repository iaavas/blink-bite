import Link from "next/link";
import { FaTruckFast } from "react-icons/fa6";

import React from "react";

function Logo() {
  return (
    <Link
      href="/"
      className="text-3xl  font-urban tracking-wider	font-bold  text-center italic lowercase  gap-4 items-center hidden sm:flex sm:flex-row-reverse "
    >
      BlinkBite
      <span className="text-green-700">
        <FaTruckFast size={40} />
      </span>
    </Link>
  );
}

export default Logo;
