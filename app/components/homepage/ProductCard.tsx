"use strict";

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Loader } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

function ProductCard({
  id,
  name,
  description,
  price,
  image,
}: ProductCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleSearchBarClick = () => {
    router.push(`/products/${id}`);
  };

  const { state } = useCart();
  const isInCart = state.items.some((item) => item.id === id);

  return (
    <div
      className={`my-2  text-center relative ease-in 	 mx-4 cursor-pointer transition-transform transform   ${
        isHovered ? "scale-105 " : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSearchBarClick}
    >
      <Image
        src={image}
        alt={"product"}
        width={250}
        height={250}
        quality={80}
        onLoad={(event) => <Loader />}
        // placeholder="blur"
        className={` p-2 ${isInCart && "grayscale"} `}
      />
      <div className="p-2 text-2xl text-center">{name}</div>
      {!isInCart ? (
        <div className="flex items-center justify-center gap-2 text-blue-900 ">
          <TbCurrencyRupeeNepalese size={30} />
          <span className="p-0 text-3xl font-bold  font-urban tracking-wider">
            {price}
          </span>
        </div>
      ) : (
        <span className="p-0 text-xl uppercase font-bold">already in cart</span>
      )}
    </div>
  );
}

export default ProductCard;
