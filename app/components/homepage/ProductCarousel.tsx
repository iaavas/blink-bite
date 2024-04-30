import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { URL } from "@/constants/constant";
import { useFilter } from "@/app/context/FilterContext";
import Loading from "../ui/Loading";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <div className="mx-8 p-8">
      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{category}</h2>

          <Carousel className="">
            <CarouselContent>
              {/* @ts-ignore */}
              {groupedProducts[category].map((product) => (
                <CarouselItem key={product.id} className="basis-1/3">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    unit={product.unit}
                    quantity={product.quantity}
                    discount={product.discount}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* @ts-ignore */}
            {groupedProducts[category].length > 3 && (
              <CarouselPrevious className="mr-3" />
            )}
            {/* @ts-ignore */}
            {groupedProducts[category].length > 3 && (
              <CarouselNext className="mr-3" />
            )}
          </Carousel>
        </div>
      ))}
    </div>
  );
}

export default ProductCarousel;
