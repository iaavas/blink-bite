import React, { useState } from "react";
import ProductList from "./ProductsList";
import { Button } from "antd";
import AddProduct from "../products/AddProduct";

function AdminDetails() {
  return (
    <div className="flex-grow overflow-y-auto max-h-screen">
      <ProductList />
    </div>
  );
}

export default AdminDetails;
