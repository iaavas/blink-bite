"use client";
import Button from "@/app/components/ui/Button";
import Footer from "@/app/components/ui/Footer";
import Nav from "@/app/components/ui/Nav";
import { useCart } from "@/app/context/CartContext";
import { URL } from "@/constants/constant";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import { toast } from "react-toastify";

function ProductPage() {
  const router = useRouter();
  const { productId } = useParams();
  const { dispatch } = useCart();

  const [product, setProduct] = useState<{
    name: string;
    description: string;
    price: number;
    image: string;
    color: string;
    brand: string;
    size: string;
  }>({
    name: "",
    description: "",
    price: 0,
    image: "",
    color: "",
    brand: "",
    size: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${URL}product/${productId}`);

        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [productId, router]);

  const { state } = useCart();

  const isInCart = state.items.some((item) => item.id === productId);

  function handleCartClick() {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...product, id: productId as string },
    });
    toast.success("Added to Cart", { position: "bottom-center" });
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto mt-8 p-4">
        <div className="flex items-end justify-end mb-8">
          <Button
            type={"primary"}
            handleClick={() => router.back()}
            css="w-1/3"
          >
            Back
          </Button>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div>
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className={`${isInCart && "grayscale"}`}
            />
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 mt-4 md:mt-0 md:pl-4 ml-8 gap-4">
            <h1 className="text-6xl font-bold mb-2 font-urban tracking-wider text-blue-950">
              {product.name}
            </h1>
            <h3 className="text-gray-700 mb-4 text-2xl">
              {product.description}
            </h3>
            <div
              className={`text-2xl  mb-4 rounded-full p-2  border-1 border-black w-8 h-8`}
              style={{
                backgroundColor: `${product.color}`,
                filter: "brightness(95%",
              }}
            ></div>
            <p className="text-2xl  mb-2 flex gap-2">
              <span className="font-semibold font-urban tracking-wider">
                Brand :{" "}
              </span>
              <span className="text-stone-700">{product.brand}</span>
            </p>
            <p className="text-2xl  mb-4 flex gap-2">
              <span className="font-semibold font-urban tracking-wider">
                Size :{" "}
              </span>
              <span className="text-stone-700">{product.size}</span>
            </p>

            <div className="flex gap-2 mb-8 items-center text-green-900 ">
              <TbCurrencyRupeeNepalese size={30} />
              <span className="p-0 text-3xl font-bold  font-urban tracking-wider">
                {product.price}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {!isInCart && (
                <Button
                  type={"fourth"}
                  handleClick={handleCartClick}
                  css="w-1/3"
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;
