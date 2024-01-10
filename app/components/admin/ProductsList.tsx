import React, { useState, useEffect } from "react";
import Product from "./Product";
import { URL } from "@/constants/constant";
import Button from "../ui/Button";
interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = () => {
  const [products, setProducts] = useState<
    Array<{
      name: string;
      description: string;
      price: number;
      id: string;
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

  return (
    <div className="p-6 w-full font-urban">
      <p className="font-bold text-2xl mb-6">
        Total Products: {products.length}
      </p>

      <table className="w-full border-collapse rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
