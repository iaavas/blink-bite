import React from "react";
import CategoryCard from "./CategoryCard";

const CategoryCarousel = () => {
  return (
    <div className="flex flex-wrap  justify-around	 flex-1 items-center gap-0 bg-white order-3 mb-20">
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
    </div>
  );
};

export default CategoryCarousel;
