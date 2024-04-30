"use client";
import React, { useEffect, useState } from "react";
import Loading from "../ui/Loading";
import { URL } from "@/constants/constant";
import ProductCard from "../homepage/ProductCard";

function CatProducts({ category }: { category: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${URL}c/products?cat=${category}`);
        const data = await response.json();

        setIsLoading(false);
        setCategories(data.categories);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [category]);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center w-screen">
        {" "}
        <Loading />{" "}
      </div>
    );

  return (
    <div className="flex flex-wrap gap-8  p-8  ">
      {categories.length > 0 &&
        categories.map((c: any) => (
          <ProductCard
            key={c.id} // Ensure each component has a unique key
            id={c.id}
            name={c.name}
            description={c.description}
            discount={c.discount}
            price={c.price}
            quantity={c.quantity}
            image={c.image}
            unit={c.unit}
          />
        ))}
    </div>
  );
}

export default CatProducts;
