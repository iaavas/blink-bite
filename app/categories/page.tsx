"use client";
import React from "react";
import CatNav from "../components/categories/CatNav";
import Nav from "../components/ui/Nav";
import CatProducts from "@/app/components/categories/CatProducts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();

  const category = searchParams.get("s");

  return (
    <main>
      <Nav />
      <div className="flex overflow-clip">
        <div className="flex-none overflow-y-auto  w-1/4 max-h-screen">
          <CatNav nav={category as string} />
        </div>
        <ScrollArea className="h-[85vh]    p-4 flex-grow overflow-y-auto max-h-screen">
          <CatProducts category={category as string} />
        </ScrollArea>
      </div>
    </main>
  );
}

export default Page;
