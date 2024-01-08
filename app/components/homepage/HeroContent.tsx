import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../ui/Button";

function HeroContent() {
  return (
    <div className="bg-blue-50 flex justify-center px-2 pt-2">
      <div className="flex flex-col sm:flex-row gap-20  ">
        <Image
          src="/model.png"
          alt="A Female Model"
          width={300}
          height={300}
          className="mt-2"
          priority={true}
        />
        <div className="flex flex-col gap-4 justify-center sm:ml-10 ml-4 mt-4">
          <h1 className="font-urban uppercase text-6xl font-semibold ">
            summer sale
          </h1>
          <span className="font-urban uppercase text-xl mt-8 tracking-wider max-w-md">
            don&apos;t KILL YOURSELF YET, SUMMER DRESS SEASON IS HERE{" "}
          </span>

          <Button to="/products" type="primary">
            Show Me More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroContent;
