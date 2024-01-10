"use client";
import React from "react";
import Nav from "../components/ui/Nav";
import Footer from "../components/ui/Footer";
import Link from "next/link";
import Image from "next/image";
import OrderSummary from "../components/cart/OrderSummary";
import CartQuantity from "../components/cart/CartQuantity";
import ShoppingNavigation from "../components/cart/ShoppingNavigation";
import CartDescription from "../components/cart/CartDescription";
import { useCart } from "../context/CartContext";

function Page() {
  const { state } = useCart();
  return (
    <>
      <Nav />
      <div className="flex justify-evenly flex-col p-8">
        <ShoppingNavigation />

        <div className="flex justify-between items-center mt-6  flex-col-reverse  gap-8">
          {state.items.map((item, index) => {
            return <CartDescription key={index} item={item} />;
          })}
          {/* <CartQuantity />

          <OrderSummary /> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;
