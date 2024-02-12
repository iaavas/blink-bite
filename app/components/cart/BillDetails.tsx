import React from "react";
import { RiBillLine } from "react-icons/ri";
import { MdDeliveryDining } from "react-icons/md";
import { useCart } from "@/app/context/CartContext";
import TotalPrice from "../ui/TotalPrice";

function BillDetails() {
  const totalPrice = TotalPrice();
  return (
    <div className="container mx-auto p-4 text-gray-700 bg-white rounded-lg mt-4 mb-12">
      <h1 className="text-lg font-bold mb-4">Bill Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-4">
          <RiBillLine size={15} />
          <span className="text-sm font-medium">Item Total</span>
        </div>
        <span className="text-sm font-medium text-right">Rs. {totalPrice}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-200 pb-4 items-center mt-4">
        <div className="flex items-center space-x-4">
          <MdDeliveryDining size={20} />
          <span className="text-sm font-medium">Delivery Charge</span>
        </div>
        <span className="text-sm font-medium text-right">Free</span>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-md font-bold">Grand Total</span>
        <span className="text-md font-bold text-right">Rs. {totalPrice}</span>
      </div>
    </div>
  );
}

export default BillDetails;
