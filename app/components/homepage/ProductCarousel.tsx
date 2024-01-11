"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { URL } from "@/constants/constant";
import { useCart } from "@/app/context/CartContext";
import { useSearch } from "@/app/context/SearchContext";

function ProductCarousel({ limit = null }: { limit?: number | null }) {
  const { searchQuery } = useSearch();
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

  let limitedProducts = limit !== null ? products.slice(0, limit) : products;

  if (searchQuery.length > 0 && !limit) {
    limitedProducts = limitedProducts.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return (
    <div className="flex flex-wrap  justify-around rounded-lg mx-1 gap-4 bg-white shadow-lg p-4 mb-8">
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
  );
}

export default ProductCarousel;
