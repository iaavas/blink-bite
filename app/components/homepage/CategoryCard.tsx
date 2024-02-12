import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

function CategoryCard({ name }: { name: string }) {
  const router = useRouter();
  return (
    <div
      className="my-2 text-center relative border rounded-xl bg-slate-100 p-1 flex items-center justify-center cursor-pointer"
      onClick={() => {
        router.push(`/categories/${name}`);
      }}
    >
      <p className="  text-black text-2xl tracking-wider  font-urban uppercase font-bold">
        {name}
      </p>
    </div>
  );
}

export default CategoryCard;
