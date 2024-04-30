import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./context/CartContext";
import { FilterProvider } from "./context/FilterContext";
import { SearchProvider } from "./context/ProductsContext";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Groceries at your doorstep | Blinkbite",
  description: "Your Groceries at your home in 30 minutes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ToastContainer />
        <FilterProvider>
          <SearchProvider>
            <AuthProvider>
              <CartProvider>{children}</CartProvider>
            </AuthProvider>
          </SearchProvider>
        </FilterProvider>
      </body>
    </html>
  );
}
