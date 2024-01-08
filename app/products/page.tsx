import React from "react";
import Footer from "../components/ui/Footer";
import Nav from "../components/ui/Nav";
import ProductCarousel from "../components/homepage/ProductCarousel";
import ProductFilters from "../components/products/ProductFilters";

function page() {
  return (
    <main className="bg-white">
      <Nav />
      <ProductFilters />
      <ProductCarousel />

      <Footer />
    </main>
  );
}

export default page;
