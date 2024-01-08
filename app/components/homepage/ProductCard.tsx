"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

function ProductCard() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleSearchBarClick = () => {
    // Navigate to the /product/1 route
    router.push("/product/1");
  };

  return (
    <div
      className={`my-2 text-center relative ease-in`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full opacity-0 bg-black flex items-center justify-center transition-opacity duration-300 ease-in-out p-4 gap-8 ${
          isHovered ? "opacity-40" : ""
        }`}
      >
        <div className="bg-white rounded-full p-2 cursor-pointer text-stone-900 opacity-100 z-99">
          <FaSearch size={20} />
        </div>
        <div className="bg-white rounded-full p-2 cursor-pointer text-stone-900 opacity-100 z-99">
          <FaShoppingCart size={20} />
        </div>
      </div>

      <Image
        src={"/product1.png"}
        alt={"product"}
        className={`object-cover p-2`}
        width={300}
        height={300}
      />
    </div>
  );
}

export default ProductCard;
