"use client";
import Link from "next/link";
import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import Logo from "./Logo";
import { useAuth } from "@/app/context/AuthContext";
import Button from "./Button";

function Nav() {
  const { token, logout } = useAuth();
  return (
    <nav className="bg-white ">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <input
            type="text"
            className="border border-gray-400 p-1 sm:block hidden"
          />
        </div>

        <Logo />

        <div className="hidden md:flex items-center gap-4 font-urban uppercase font-semibold">
          {!token && <Link href="/register">Register</Link>}
          {!token ? (
            <Link href="/login">Sign In</Link>
          ) : (
            <Button handleClick={logout} type={"primary"}>
              LogOut
            </Button>
          )}
          <Link href="/cart">
            <MdOutlineShoppingCart size={20} />
          </Link>
        </div>

        <div className="md:hidden flex items-center ">
          <button
            type="button"
            className="text-2xl text-gray-600 focus:outline-none "
            onClick={() => alert("Toggle your mobile menu here")}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
