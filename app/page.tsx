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

      <HeroContent
        color={"green"}
        title="Herbal Corner"
        image="/herbal.png"
        subtitle="Get all the herbal care you need for your skin"
        css="hidden md:flex"
      />
      <div className="md:flex gap-4 items-center hidden">
        <HeroContent
          color={"red"}
          title="Dashain Sale"
          image="/hero.png"
          subtitle="don't kill yourself yet, dashain season is here"
          css="w-1/2"
        />
        <HeroContent
          color={"yellow"}
          title="Get favourite foods of your pets"
          image="/pet.png"
          subtitle="Food, treats and more"
          css="w-1/2"
        />
      </div>
      <CategoryCarousel />

      <ProductCarousel />
      {/* <Newsletter /> */}
      <Footer />
    </main>
  );
}
