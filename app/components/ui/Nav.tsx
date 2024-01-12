"use client";
import Link from "next/link";
import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import Logo from "./Logo";
import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import MobileNav from "./MobileNav";
import { toast } from "react-toastify";

function Nav() {
  const { token, logout, role } = useAuth();
  const { state } = useCart();

  const cartLength = state.items.length;

  return (
    <nav className="bg-white md:pt-4">
      <div className="max-w-screen-xl md:flex items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <span className="font-urban  text-stone-800  text-xl cursor-pointer font-bold opacity-0">
            Best In Nepal
          </span>
        </div>

        <Logo />

        <div className="hidden md:flex items-center gap-4 font-urban uppercase font-semibold">
          <Link href="/products" className="">
            Products
          </Link>
          {!token && <Link href="/register">Register</Link>}
          {role === "ADMIN" && <Link href="/register">Register</Link>}
          {!token ? (
            <Link href="/login">Sign In</Link>
          ) : (
            <button
              onClick={() => {
                logout();
                toast.warn("Logged Out!", { position: "bottom-right" });
              }}
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

      <MobileNav />
    </nav>
  );
}

export default Nav;
