import React from "react";

function CartQuantity() {
  return (
    <div className="font-urban flex flex-col gap-4 justify-center">
      <div className="flex jusify-center items-center gap-4">
        <span className="text-3xl text-center">&#43;</span>
        <span className="text-3xl text-center">1</span>
        <span className="text-3xl text-center">&minus;</span>
      </div>
      <h2 className="text-center text-4xl font-bold">Rs 220</h2>
    </div>
  );
}

export default CartQuantity;
