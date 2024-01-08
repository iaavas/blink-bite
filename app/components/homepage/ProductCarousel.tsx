import React from "react";
import ProductCard from "./ProductCard";

function ProductCarousel() {
  return (
    <div className="flex flex-wrap  justify-around	 flex-1 items-center gap-0 bg-white order-3  p-2 mb-8">
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}

export default ProductCarousel;
