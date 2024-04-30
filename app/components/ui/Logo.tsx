import Link from "next/link";
import { FaTruckFast } from "react-icons/fa6";

import React from "react";

function Logo() {
  return (
    <Link
      href="/"
      className="text-xl   tracking-wider	font-semibold  text-center italic   gap-4 items-center hidden sm:flex sm:flex-row-reverse "
    >
      BlinkBite
      <span className="text-red-500">
        <FaTruckFast size={40} />
      </span>
    </Link>
  );
}

export default Logo;
