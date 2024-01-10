import { useAuth } from "@/app/context/AuthContext";
import { URL } from "@/constants/constant";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../ui/Loading";

interface ProductProps {
  product: {
    name: string;
    description: string;
    price: number;
    id: string;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  async function handleDelete() {
    setIsLoading(true);
    const res = await fetch(`${URL}product/${product.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token!}`,
      },
    });

    if (res.ok) {
      toast.error("Product Deleted!!!");
      setIsLoading(false);
    }
  }

  return (
    <tr className="bg-white rounded-lg overflow-hidden shadow-lg">
      <td className="p-4 font-semibold text-gray-800">{product.name}</td>
      <td className="p-4">{product.description}</td>
      <td className="p-4">${product.price}</td>
      <td className="p-4">
        <div className="flex justify-end">
          <button className="bg-blue-400 text-white px-4 py-2 mr-2 rounded-lg">
            Modify
          </button>
          {!isLoading ? (
            <button
              className="bg-red-400 text-white px-4 py-2 rounded-lg"
              onClick={handleDelete}
            >
              Delete
            </button>
          ) : (
            <Loading />
          )}
        </div>
      </td>
    </tr>
  );
};

export default Product;
