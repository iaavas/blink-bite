import Link from "next/link";
import React from "react";
import { FaShirt } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { CiShop } from "react-icons/ci";

function Sidebar() {
  return (
    <div className="bg-gray-800  text-white p-4  font-urban w-52 h-screen flex-none overflow-y-hidden max-h-screen">
      <h2 className="font-bold mb-4 text-sm md:text-lg">Vastra Admin</h2>
      <ul className="flex flex-col gap-4 items-center sm:items-start mt-4">
        <li className="mb-2">
          <Link
            href="#"
            className="flex items-center hover:text-green-500 mx-auto"
          >
            <span className="mr-2">
              <FaUser />
            </span>
            <span className="hidden md:inline">Users</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href="#"
            className="flex items-center hover:text-green-500 mx-auto"
          >
            <span className="mr-2">
              <FaShirt />
            </span>
            <span className="hidden md:inline">Products</span>
          </Link>
        </li>

        <li className="mb-2">
          <Link
            href="/"
            className="flex items-center hover:text-green-500 mx-auto"
          >
            <span className="mr-2">
              <CiShop />
            </span>
            <span className="hidden md:inline">Client View</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
