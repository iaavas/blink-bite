import React from "react";
import CatNav from "../../components/categories/CatNav";
import Nav from "../../components/ui/Nav";
import CatProducts from "@/app/components/categories/CatProducts";

function page({ params }: { params: { category: string } }) {
  console.log("first");
  console.log(params.category);
  return (
    <div>
      <Nav />
      <div className="flex gap-4 space-y-4">
        <CatNav nav={params.category} />
        <CatProducts category={params.category as string} />
      </div>
    </div>
  );
}

export default page;
