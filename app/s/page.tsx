"use client";
import { useEffect, useState } from "react";
import NoResult from "../components/ui/NoResult";
import Loading from "../components/ui/Loading";
import ProductCard from "../components/homepage/ProductCard";
import Nav from "../components/ui/Nav";
import { useSearchParams } from "next/navigation";
import { URL } from "@/constants/constant";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
  quantity: number;
  description: string;
  discount: number;
}

const Results: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null); //
  const sp = useSearchParams();
  const q = sp.get("q");

  useEffect(() => {
    if (!q) {
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${URL}s?q=${q}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.products);
        } else {
          throw new Error("Failed to fetch results");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch results. Please try again later."); // Set error state
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [q]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading size={50} />
      </div>
    );
  }

  return (
    <>
      <Nav />
      {!error ? (
        <>
          <div className="my-8 font-bold mx-12 text-md font-roboto">
            Showing results for: &quot;{q}&quot;
          </div>
          <div className="flex flex-wrap justify-around items-center gap-4 overflow-x-hidden mx-12 mb-8">
            {results.map((result) => (
              <ProductCard
                key={result.id}
                name={result.name}
                id={result.id}
                price={result.price}
                image={result.image}
                unit={result.unit}
                discount={result.discount}
                quantity={result.quantity}
                description={result.description}
              />
            ))}
          </div>
        </>
      ) : (
        <NoResult />
      )}
    </>
  );
};

export default Results;
