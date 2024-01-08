import Link from "next/link";
import React from "react";
import Button from "../ui/Button";

function ShoppingNavigation() {
  return (
    <div className="flex justify-evenly items-center gap-8">
      <Button to={"/shop"} type="primary">
        Continue Shopping
      </Button>
      <span className="font-urban underline uppercase">shopping cart (1) </span>
      <Button to={"/checkout"} type="fourth">
        Checkout
      </Button>
    </div>
  );
}

export default ShoppingNavigation;
