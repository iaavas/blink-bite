import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaHome, FaTshirt } from "react-icons/fa";
import { MdOutlinePerson, MdOutlineShoppingCart } from "react-icons/md";

function MobileNav() {
  const pathname = usePathname();
  const { token, logout } = useAuth();
  const { state } = useCart();
  const cartLength = state.items.length;
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-300 z-50">
      <div className="flex justify-around">
        <Link href="/">
          <div
            className={`flex flex-col items-center ${
              pathname === "/" ? "text-green-800" : ""
            } `}
          >
            <FaHome size={24} />
            <span className="text-xs">Home</span>
          </div>
        </Link>
        <Link href="/products">
          <div
            className={`flex flex-col items-center ${
              pathname === "/products" ? "text-green-800" : ""
            } `}
          >
            <FaTshirt size={24} />
            <span className="text-xs">Shop</span>
          </div>
        </Link>

        <Link href="/cart">
          <div className="relative">
            <MdOutlineShoppingCart size={23} />
            <span className="text-xs">Cart</span>
            {cartLength > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                {cartLength}
              </div>
            )}
          </div>
        </Link>

        {!token && (
          <Link href="/register">
            <div className="flex flex-col items-center">
              <MdOutlinePerson size={24} />
              <span className="text-xs">Register</span>
            </div>
          </Link>
        )}
        {!token ? (
          <Link href="/login">
            <div className="flex flex-col items-center">
              <MdOutlinePerson size={24} />
              <span className="text-xs">Sign In</span>
            </div>
          </Link>
        ) : (
          <button
            onClick={() => {
              logout();
            }}
            className="flex flex-col items-center"
          >
            <MdOutlinePerson size={24} />
            <span className="text-xs">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default MobileNav;
