import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { URL } from "@/constants/constant";
import { useFilter } from "@/app/context/FilterContext";
import Loading from "../ui/Loading";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function ProductCarousel({ limit = null }) {
  const { searchQuery, clicked, setClicked } = useFilter();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${URL}product`);
        const data = await response.json();
        console.log(data);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setClicked(false);
  }, [searchQuery, setClicked]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading size={40} />
      </div>
    );
  }

  // Group products by category
  const groupedProducts = {};
  products.forEach((product) => {
    // @ts-ignore
    if (!groupedProducts[product.category]) {
      // @ts-ignore
      groupedProducts[product.category] = [];
    }
    // @ts-ignore
    groupedProducts[product.category].push(product);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{category}</h2>
          <ScrollArea className="w-full  rounded-md ">
            <div className="flex  gap-4 my-1 ">
              {/* @ts-ignore */}
              {groupedProducts[category].map((product) => (
                <ProductCard
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  unit={product.unit}
                  quantity={product.quantity}
                  key={product.id}
                  discount={product.discount}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ))}
    </div>
  );
}

export default ProductCarousel;
