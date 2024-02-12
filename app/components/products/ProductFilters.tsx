"use client";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useFilter } from "@/app/context/FilterContext";
import { URL } from "@/constants/constant";

function ProductFilters() {
  const {
    searchQuery,
    setSearchQuery,
    setClicked,
    sortBy,
    setSortBy,
    color,
    setColor,
  } = useFilter();

  function handleSearchClick() {
    if (searchQuery.length < 1) return;
    setSearchQuery(searchQuery);
    setClicked(true);
  }

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<
    Array<{
      id: string;
      name: string;
      description: string;
      price: number;
      image: string;
      color: string;
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

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSortBy(e.target.value);
  }

  function handleColorChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setColor(e.target.value);
  }

  const uniqueColors = [...new Set(products.map((product) => product.color))];

  const colorOptions = uniqueColors.map((color) => (
    <option key={color} value={color}>
      {color.charAt(0).toUpperCase() + color.slice(1)}{" "}
    </option>
  ));

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mx-10 my-4 gap-8 sm:gap-2 sm:order-2 order-1 ">
      <div>
        <select
          className="border border-gray-400 bg-white rounded-full p-2"
          onChange={handleSortChange}
          value={sortBy}
        >
          <option value="asc">Sort by Price (Asc)</option>
          <option value="desc">Sort by Price (Desc)</option>
        </select>
      </div>

      <div>
        <select
          className="border border-gray-400 bg-white rounded-full p-2"
          value={color}
          onChange={handleColorChange}
        >
          <option>All Colors</option>
          {colorOptions}
        </select>
      </div>
    </div>
  );
}

export default ProductFilters;
