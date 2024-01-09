import { useAuth } from "@/app/context/AuthContext";
import { URL } from "@/constants/constant";
import React from "react";
import { toast } from "react-toastify";

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
  async function handleDelete() {
    const res = await fetch(`${URL}product/${product.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token!}`,
      },
    });

    if (res.ok) {
      toast.error("Product Deleted!!!");
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
          <button
            className="bg-red-400 text-white px-4 py-2 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Product;
