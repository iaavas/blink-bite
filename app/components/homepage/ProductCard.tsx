"use strict";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

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
    // Navigate to the /product/1 route
    router.push(`/products/${id}`);
  };

  return (
    <div
      className={`my-2 text-center relative ease-in mx-4`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full opacity-0 bg-black flex items-center justify-center transition-opacity duration-300 ease-in-out p-4 gap-8 ${
          isHovered ? "opacity-40" : ""
        }`}
      >
        <button
          className="bg-white rounded-full p-2 cursor-pointer text-stone-900 opacity-100 z-99"
          onClick={handleSearchBarClick}
        >
          <FaSearch size={20} />
        </button>
        <div className="bg-white rounded-full p-2 cursor-pointer text-stone-900 opacity-100 z-99">
          <FaShoppingCart size={20} />
        </div>
      </div>

      <Image
        src={image}
        alt={"product"}
        className={`object-cover p-2`}
        width={300}
        height={300}
      />
      <div className="p-4 underline">{name}</div>
    </div>
  );
}

export default ProductCard;
