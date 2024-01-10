"use client";
import Link from "next/link";
import React from "react";
import {
  MdOutlineShoppingCart,
  MdOutlinePerson,
  MdOutlineMenu,
} from "react-icons/md";
import Logo from "./Logo";
import { useAuth } from "@/app/context/AuthContext";
import Button from "./Button";
import { FaHome, FaTshirt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

function Nav() {
  const { token, logout } = useAuth();
  const { state } = useCart();
  const cartLength = state.items.length;
  const pathname = usePathname();

  return (
    <nav className="bg-white md:pt-4">
      <div className="max-w-screen-xl md:flex items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <input
            type="text"
            className="border border-gray-400 p-1 sm:block hidden"
          />
        </div>

        <Logo />
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-4 font-urban uppercase font-semibold">
          {!token && <Link href="/register">Register</Link>}
          {!token ? (
            <Link href="/login">Sign In</Link>
          ) : (
            <button
              onClick={logout}
              className="border-2 font-urban uppercase p-2 border-black mr-6"
            >
              Logout
            </button>
          )}
          <Link href="/cart">
            <div className="relative">
              <MdOutlineShoppingCart size={30} />
              {cartLength > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center p-1 text-sm">
                  {cartLength}
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-300 z-50">
        <div className="flex justify-around">
          <Link href="/">
            <div
              className={`flex flex-col items-center ${
                pathname === "/" ? "text-red-800" : ""
              } `}
            >
              <FaHome size={24} />
              <span className="text-xs">Home</span>
            </div>
          </Link>
          <Link href="/products">
            <div
              className={`flex flex-col items-center ${
                pathname === "/products" ? "text-red-800" : ""
              } `}
            >
              <FaTshirt size={24} />
              <span className="text-xs">Shop</span>
            </div>
          </Link>

          <Link href="/cart">
            <div className="relative">
              <MdOutlineShoppingCart size={24} />
              {cartLength > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {cartLength}
                </div>
              )}
            </div>
          </Link>

          {!token && (
            <Link href="/register">
              <div className="flex flex-col items-center">
                <MdOutlinePerson size={24} />
                <span className="text-xs">Register</span>
              </div>
            </Link>
          )}
          {!token ? (
            <Link href="/login">
              <div className="flex flex-col items-center">
                <MdOutlinePerson size={24} />
                <span className="text-xs">Sign In</span>
              </div>
            </Link>
          ) : (
            <button
              onClick={() => {
                logout();
              }}
              className="flex flex-col items-center"
            >
              <MdOutlinePerson size={24} />
              <span className="text-xs">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
