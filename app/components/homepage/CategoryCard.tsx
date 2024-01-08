import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";

function CategoryCard() {
  return (
    <div className="my-2 text-center relative">
      <p className="absolute top-60 left-0 right-0 text-white text-4xl  font-urban uppercase">
        Winter Style!
      </p>
      <Image
        src={"/category1.jpg"}
        alt={"product"}
        className="object-cover"
        width={400}
        height={400}
      />

      <Button to="/shop" type="third">
        Shop Now
      </Button>
    </div>
  );
}

export default CategoryCard;
