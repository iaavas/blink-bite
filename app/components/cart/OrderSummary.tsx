import React from "react";

function OrderSummary() {
  return (
    <div className="p-8 border border-1 flex flex-col rounded-md font-urban text-stone-500">
      <h1 className="uppercase font-bold text-3xl tracking-wide text-black mb-4">
        order summary
      </h1>
      <div className="flex items-center justify-between p-2">
        <span className="text-black text-lg">Subtotal</span>
        <span>Rs. 220</span>
      </div>
      <div className="flex items-center justify-between p-2">
        <span className="text-black text-lg">Estimated Shipping</span>
        <span>Rs. 22</span>
      </div>
      <div className="flex items-center justify-between p-3">
        <span className="text-black text-xl font-bold">Total</span>
        <span className="text-xl font-bold">Rs. 242</span>
      </div>
    </div>
  );
}

export default OrderSummary;
