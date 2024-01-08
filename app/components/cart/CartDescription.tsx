import Image from "next/image";
import React from "react";

function CartDescription() {
  return (
    <div className="flex justify-between items-center font-urban sm:flex-row flex-col">
      <Image src="/product1.png" width={200} height={100} alt="product" />
      <div className="flex flex-col ml-6">
        <div className="flex items-center justify-between gap-4">
          <span className="font-bold text-2xl">Product </span>
          <span className=" text-lg text-stone-500">White T-Shirt</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="font-bold text-2xl">ID</span>
          <span className=" text-lg text-stone-500">23228242</span>
        </div>
        <div className="flex items-center justify-between gap-4 ">
          <span className="font-bold text-2xl">Size</span>
          <span className=" text-lg text-stone-500">L</span>
        </div>
      </div>
    </div>
  );
}

export default CartDescription;
