import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import QuantityButton from "../products/QuantityButton";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  unit: string;
  discount: number;
  quantity: number;
}

function ProductCard({
  id,
  name,
  description,
  discount,
  price,
  quantity,
  image,
  unit,
}: ProductCardProps) {
  const router = useRouter();
  const { state, dispatch } = useCart();

  const isInCart = state.items.some((item) => item.id === id);
  const curquantity = state.items.find((item) => item.id === id)?.quantity;

  const decreaseQuantity = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!curquantity) return;
    if (curquantity <= 1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: id as string, quantity: 0 },
      });

      dispatch({
        type: "REMOVE_ITEM",
        payload: { id: id as string },
      });
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: id as string, quantity: curquantity - 1 },
      });
    }
  };

  const increaseQuantity = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!curquantity) return;
    if (isInCart === true && curquantity < quantity) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: id as string, quantity: curquantity + 1 },
      });
    }
  };

  const product = {
    id,
    name,
    price,
    image,
    quantity: 1,
    unit,
    discount,
  };

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch({
      type: "ADD_ITEM",
      payload: { ...product, id: id as string },
    });
    toast.success("Added to Cart", { position: "bottom-center" });
  };

  function handleClick() {
    router.push(`product/${id}`);
  }

  return (
    <div
      className="border border-gray-300 rounded-lg shadow-lg bg-white p-4 relative w-52 h-96 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <Image
          src={image}
          alt={"product"}
          width={300}
          height={300}
          quality={80}
          className={`w-32 h-32 mx-auto ${isInCart && "grayscale"}`}
        />
        {discount > 0 && (
          <span className="absolute top-0 left-0 bg-red-700 text-white text-xs font-semibold px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
      </div>
      <p className="text-gray-500 font-semibold text-md  p-2 text-center">
        {unit}
      </p>
      <div className="p-4">
        <p className="text-gray-800 font-semibold text-lg mb-8 ">{name}</p>

        <div className="absolute bottom-0 left-0 right-0 mx-auto flex items-center justify-between py-2 px-4 mt-4">
          <div className="flex items-center">
            <TbCurrencyRupeeNepalese className="h-5 w-5 text-black" />
            <div>
              <span className="font-semibold text-black ml-1">{price}</span>
            </div>
          </div>
          <div>
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
    </div>
  );
}

export default ProductCard;
