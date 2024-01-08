import React from "react";

interface ProductProps {
  product: {
    name: string;
    description: string;
    price: number;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
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
          <button className="bg-red-400 text-white px-4 py-2 rounded-lg">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Product;
