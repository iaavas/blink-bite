"use client";
import Link from "next/link";
import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import Logo from "./Logo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import MobileNav from "./MobileNav";
import { ScrollArea } from "@/components/ui/scroll-area";

import { toast } from "react-toastify";
import Search from "./Search";
import CartItems from "../cart/CartItems";
import BillDetails from "../cart/BillDetails";
import Coupon from "../cart/Coupon";
import Image from "next/image";

function Nav() {
  const { token, logout, role } = useAuth();
  const { state } = useCart();

  const cartLength = state.items.reduce((acc, cur) => acc + cur.quantity, 0);
  const totalSum = state.items.reduce(
    (acc, cur) => acc + (cur.price - cur.discount) * cur.quantity,
    0
  );

  return (
    <nav className="bg-white md:p-4 text-center border ">
      <div className=" md:flex items-center justify-around   ">
        <Logo />

        <span className="font-bold  text-lg text-left   px-4 capitalize w-full  mb-8 sm:mb-0 flex items-center ml-4">
          Delivery in 30 Mins
        </span>
        <Search />

        {/* <div className="hidden md:flex items-center gap-4 font-roboto text-lg tracking uppercase ">
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
        </div> */}
        <Sheet>
          <SheetTrigger className="flex items-center  w-2/6  bg-green-700 rounded-lg justify-center gap-3 text-white font-bold py-3">
            <MdOutlineShoppingCart size={25} />

            <div className="flex flex-col items-center justify-center text-sm">
              {state.items.length > 0 ? (
                <>
                  <span>{cartLength} Items</span>
                  <span>Rs. {totalSum}</span>
                </>
              ) : (
                <span>My Cart</span>
              )}
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="border-b w-full mb-2 p-2">
                My Cart
              </SheetTitle>
              {state.items.length > 0 ? (
                <ScrollArea className="h-[550px] rounded-md ">
                  <SheetDescription className="bg-[#F5F7FD] p-4 ">
                    <ScrollArea className="h-[300px]  rounded-md ">
                      <div className="flex bg-white text-black justify-between flex-col p-4 rounded-lg ">
                        <CartItems />
                      </div>
                    </ScrollArea>
                    <BillDetails />
                  </SheetDescription>
                  <div className="fixed bottom-0  bg-white w-96 p-4 border rounded-lg">
                    <Coupon />
                  </div>
                </ScrollArea>
              ) : (
                <div className="bg-white m-4 rounded-lg  flex justify-center items-center flex-col">
                  <Image
                    src={"/empty_cart.png"}
                    width={200}
                    height={200}
                    alt="Empty Cart"
                  />
                  <p className=" font-bold text-xl">
                    You don&apos;t have any items in cart
                  </p>
                  <p className="  text-md text-stone-500">
                    Get your favourite items now!
                  </p>
                </div>
              )}
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <MobileNav />
    </nav>
  );
}

export default Nav;
