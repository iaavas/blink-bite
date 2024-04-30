"use client";
import QuantityButton from "@/app/components/products/QuantityButton";
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

  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    image: "",
    unit: "",
    keyFeatures: [],
    discount: 0,
    quantity: 0,
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
  const curquantity = state.items.find(
    (item) => item.id === productId
  )?.quantity;

  const decreaseQuantity = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!curquantity) return;
    if (curquantity <= 1) {
      dispatch({
        type: "REMOVE_ITEM",
        payload: { id: product.id as string },
      });
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: product.id as string, quantity: 0 },
      });
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: product.id as string, quantity: curquantity - 1 },
      });
    }
  };

  const increaseQuantity = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!curquantity) return;
    if (isInCart === true && curquantity < product.quantity) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: product.id as string, quantity: curquantity + 1 },
      });
    }
  };

  const addProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    unit: product.unit,
    discount: product.discount,
    quantity: curquantity ?? 1,
  };

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch({
      type: "ADD_ITEM",
      payload: { ...addProduct, id: product.id as string },
    });
    toast.success("Added to Cart", { position: "bottom-center" });
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto mt-8 p-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <div className="mb-8 relative">
              <Image
                src={`/${product.image}`}
                alt={product.name}
                width={300}
                height={300}
                className={`${isInCart && "grayscale"}`}
              />
              {product.discount > 0 && (
                <span className="absolute top-0 left-0 bg-red-700 text-white text-xl font-semibold px-4 py-2 rounded-lg ">
                  {product.discount}% OFF
                </span>
              )}
            </div>
            <div className="flex flex-col gap-8 ml-8 ">
              <h2 className="text-2xl font-semibold ">Key Features:</h2>
              <ul className="list-disc pl-5">
                {product.keyFeatures.map((feature, index) => (
                  <li key={index} className="text-lg mb-1">
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 mb-4 text-lg text-center md:text-left">
                {product.description}
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl max-w-md  font-bold mb-2 font-urban text-center md:text-left text-blue-950">
              {product.name}
            </h1>

            <div className="flex flex-col md:flex-row gap-2 items-center mb-8 text-center md:text-left">
              <p className="text-xl font-semibold font-urban tracking-wider mt-4">
                {product.unit}
              </p>
            </div>

            <div className="flex items-center mb-8">
              <TbCurrencyRupeeNepalese size={30} />

              <span
                className={`text-3xl font-bold font-urban tracking-wider ml-2 ${
                  product.discount > 0 && "line-through text-gray-500"
                }`}
              >
                {product.price}
              </span>
              {product.discount > 0 && (
                <span
                  className={`text-3xl font-bold font-urban tracking-wider ml-2 `}
                >
                  {product.price - product.discount}
                </span>
              )}
            </div>

            {!isInCart ? (
              <button
                className="bg-green-700/10 text-green-700 border border-green-700 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={handleAddClick}
              >
                ADD
              </button>
            ) : (
              <QuantityButton
                quantity={curquantity!}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;
