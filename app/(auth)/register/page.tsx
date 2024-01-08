import Footer from "@/app/components/ui/Footer";
import Logo from "@/app/components/ui/Logo";
import Nav from "@/app/components/ui/Nav";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <div className="flex flex-col items-center  justify-center p-6 mt-8 sm:ml-8">
        <form className="w-full max-w-md">
          <div className="mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500 rounded-sm font-urban tracking-wider"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Last Name"
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500 rounded-sm font-urban tracking-wider"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500 rounded-sm font-urban tracking-wider"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500 rounded-sm font-urban tracking-wider"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500 rounded-sm font-urban tracking-wider"
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-200 text-black uppercase font py-2 px-4 rounded-sm font-urabn hover:bg-blue-300 focus:outline-none focus:shadow-outline-indigo font-urban tracking-wider"
          >
            Register
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Page;
