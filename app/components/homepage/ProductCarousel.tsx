"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { URL } from "@/constants/constant";

function ProductCarousel({ limit = null }: { limit?: number | null }) {
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
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const limitedProducts = limit !== null ? products.slice(0, limit) : products;

  return (
    <div className="flex flex-wrap justify-around items-center gap-4 bg-white order-3 p-2 mb-8">
      {limitedProducts.map((product, index) => {
        return (
          <ProductCard
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default ProductCarousel;
