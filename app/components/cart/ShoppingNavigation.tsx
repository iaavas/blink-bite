"use client";
import Link from "next/link";
import React from "react";
import Button from "../ui/Button";
import { useCart } from "@/app/context/CartContext";

function ShoppingNavigation() {
  const { state, dispatch } = useCart();
  const noOfItems = state.items.length;
  function handleClearCart() {
    dispatch({ type: "CLEAR_CART" });
  }
  return (
    <div className="flex justify-evenly items-center gap-8">
      <Button to={"/products"} type="primary">
        Continue Shopping
      </Button>

      <span className="font-urban underline uppercase">
        shopping cart ({noOfItems}){" "}
      </span>

      <Button handleClick={handleClearCart} type="fourth">
        Clear Cart
      </Button>
      {noOfItems > 0 && (
        <Button to={"/checkout"} type="fourth">
          Checkout
        </Button>
      )}
    </div>
  );
}

export default ShoppingNavigation;
