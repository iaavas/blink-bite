"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { URL } from "@/constants/constant";

import { useFilter } from "@/app/context/FilterContext";
import Loading from "../ui/Loading";

function ProductCarousel({ limit = null }: { limit?: number | null }) {
  const { searchQuery, clicked, setClicked, sortBy } = useFilter();
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState<
    Array<{
      id: string;
      name: string;
      description: string;
      price: number;
      image: string;
    }>
  >([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${URL}product`);
        const data = await response.json();

        setIsLoading(false);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    setClicked(false);
  }, [searchQuery, setClicked]);

  let limitedProducts = limit !== null ? products.slice(0, limit) : products;

  if (clicked && !limit) {
    limitedProducts = limitedProducts.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortBy) {
    limitedProducts =
      sortBy === "asc"
        ? limitedProducts.sort((a, b) => a.price - b.price)
        : limitedProducts.sort((a, b) => b.price - a.price);
  }

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center ">
        <Loading size={40} />
      </div>
    );
  }

  return (
    <div>
      {clicked && limitedProducts.length > 0 && (
        <span className="uppercase font-bold font-urban tracking-wider text-3xl text-center p-2 ml-8">
          showing for: {searchQuery}
        </span>
      )}

      {limitedProducts.length > 0 ? (
        <div className="flex flex-wrap  justify-around	 rounded-lg mx-1 gap-4 bg-white shadow-lg p-4 mb-8">
          {limitedProducts.map((product, index) => (
            <ProductCard
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              key={index}
            />
          ))}
        </div>
      ) : (
        <span className="uppercase font-bold font-urban tracking-wider text-3xl text-center p-8 ml-8 flex items-center justify-center">
          OOPS LOOKS LIKE WE DON&apos;T HAVE THAT PRODUCT YET
        </span>
      )}
    </div>
  );
}

export default ProductCarousel;
