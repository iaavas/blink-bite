import Image from "next/image";
import React from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;

  brand: string;
  size: string;
  color: string;
}

interface CartDescriptionProps {
  item: CartItem;
}

function CartDescription({ item }: CartDescriptionProps) {
  const { name, brand, size, color, id, image, price } = item;

  return (
    <div className="flex justify-between items-center font-urban sm:flex-row flex-col">
      <Image src={image} width={200} height={100} alt="product" />
      <div className="flex flex-col ml-6">
        <div className="flex items-center justify-between gap-4">
          <span className="font-bold text-2xl">Product </span>
          <span className="text-lg text-stone-500">{name}</span>
        </div>

        <div className="flex items-center justify-between gap-4 ">
          <span className="font-bold text-2xl">Size</span>
          <span className="text-lg text-stone-500">{size}</span>
        </div>
        {/* Include similar sections for brand and color */}
        <div className="flex items-center justify-between gap-4 ">
          <span className="font-bold text-2xl">Brand</span>
          <span className="text-lg text-stone-500">{brand}</span>
        </div>
        <div className="flex items-center justify-between gap-4 ">
          <span className="font-bold text-2xl">Color</span>
          <span className="text-lg text-stone-500">{color}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="font-bold text-2xl">Price</span>
          <span className="text-lg text-stone-500">{price}</span>
        </div>
      </div>
    </div>
  );
}

export default CartDescription;
