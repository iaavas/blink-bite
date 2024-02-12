import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import React from "react";
import QuantityButton from "../products/QuantityButton";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
  discount: number;
}

function CartItems() {
  const { state } = useCart();

  return (
    <div>
      {state.items.map((ci) => {
        return (
          <div
            key={ci.id}
            className="flex justify-end items-center gap-2 border-b p-4"
          >
            <Image
              src={ci.image}
              width={50}
              height={50}
              alt={ci.name}
              className="w-[70px] h-[70px] border p-2"
            />
            <div className="flex flex-col gap-1 w-1/2 ml-16">
              <span>{ci.name}</span>
              <span className="text-stone-500">{ci.unit}</span>
              <span className="font-bold">Rs. {ci.price}</span>
              <span className="font-bold text-blue-500 uppercase">
                Quantity: {ci.quantity}{" "}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CartItems;
