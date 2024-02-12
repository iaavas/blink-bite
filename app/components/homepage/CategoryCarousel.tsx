import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { URL } from "@/constants/constant";
import Loading from "../ui/Loading";

function CategoryCarousel() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${URL}categories`);
        const data = await response.json();

        setIsLoading(false);
        setCategories(data.categories);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading size={40} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category} name={category} />
        ))}
      </div>
    </div>
  );
}

export default CategoryCarousel;
