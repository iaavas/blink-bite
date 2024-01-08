import React from "react";
import { IoMdSend } from "react-icons/io";

function Newsletter() {
  return (
    <div className="flex bg-red-50 justify-center items-center flex-col gap-6 p-20">
      <h1 className="font-urban sm:text-6xl text-4xl font-semibold tracking-wide">
        Newsletter
      </h1>
      <h3 className="font-urban sm:text-3xl text-xl font-thin text-stone-500">
        Get weekly updates of your favorite products
      </h3>

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Your Email"
          className=" p-2 sm:w-96	w-48"
        />
        <button className="bg-emerald-800 p-3 text-white">
          <IoMdSend />
        </button>
      </div>
    </div>
  );
}

export default Newsletter;
