import React, { useState } from "react";

function QuantityButton({
  quantity,
  decreaseQuantity,
  increaseQuantity,
}: {
  quantity: number;
  decreaseQuantity: (e: React.MouseEvent<HTMLButtonElement>) => void;
  increaseQuantity: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="uppercase border font-semibold text-sm rounded-md bg-green-700 border-green-600 p-2  text-white w-20 h-10 text-center flex items-center justify-center z-50 mb-2">
      <button
        onClick={decreaseQuantity}
        className="flex items-center justify-center w-8 h-8 rounded-full font-bold"
      >
        -
      </button>
      <div className="mx-4 text-lg">{quantity}</div>
      <button
        onClick={increaseQuantity}
        className="flex items-center  justify-center w-8 h-8 rounded-full font-bold"
      >
        +
      </button>
    </div>
  );
}

export default QuantityButton;
