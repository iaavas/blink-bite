"use client";
import Nav from "./components/ui/Nav";
import HeroContent from "./components/homepage/HeroContent";
import CategoryCarousel from "./components/homepage/CategoryCarousel";
import Newsletter from "./components/homepage/Newsletter";
import Footer from "./components/ui/Footer";
import ProductCarousel from "./components/homepage/ProductCarousel";

export default function Home() {
  return (
    <main className="bg-white">
      <Nav />
      <HeroContent />
      <CategoryCarousel />
      <ProductCarousel limit={3} />
      <Newsletter />
      <Footer />
    </main>
  );
}
